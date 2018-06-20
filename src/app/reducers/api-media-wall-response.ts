import { ApiResponseResult } from '../models/api-response';
import * as apiAction from '../actions/api';
import * as wallModerationAction from '../actions/media-wall-moderation';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import { removeDuplicateCheck, accountExclusion, hideFeed, showFeed, accountInclusion, removeId, profanityFilter } from '../models';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [entities: ApiResponseResult[]] array of response items returned by the api.
 * @prop [lastResponseLength: number] Keeps a check on the length of entities for media wall.
 */
export interface State {
	response: {
		entities: ApiResponseResult[];
		filteredEntities: ApiResponseResult[];
		hiddenFeedId: string[];
		blockedUser: string[];
		profanityCheck: boolean;
		removeDuplicate: boolean;
	};
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: entities: []
 * @prop: lastResponeLength: 0
 */
export const initialState: State = {
	response: {
		entities: [],
		filteredEntities: [],
		hiddenFeedId: [],
		blockedUser: [],
		profanityCheck: false,
		removeDuplicate: false
	}
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState,
	action: apiAction.Actions | wallPaginationAction.Actions | wallModerationAction.Actions): State {
	switch (action.type) {
		case apiAction.ActionTypes.WALL_SEARCH_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;
			let newFeeds = accountExclusion(apiResponse.statuses, state.response.blockedUser);
			newFeeds = removeDuplicateCheck(newFeeds);
			if (state.response.profanityCheck) {
				newFeeds = profanityFilter(newFeeds);
			}

			return Object.assign({}, state, {
				response: {
					...state.response,
					entities: apiResponse.statuses,
					filteredEntities: newFeeds
				}
			});
		}

		case apiAction.ActionTypes.WALL_SEARCH_COMPLETE_FAIL: {
			return state;
		}

		case wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;
			let newFeeds = accountExclusion(apiResponse.statuses, state.response.blockedUser);
			if (state.response.profanityCheck) {
				newFeeds = profanityFilter(apiResponse.statuses);
			}
			let filteredEntities = [...newFeeds, ...state.response.filteredEntities];
			filteredEntities = removeDuplicateCheck(filteredEntities);

			return Object.assign({}, state, {
				response: {
					...state.response,
					entities: [ ...apiResponse.statuses, ...state.response.entities ],
					filteredEntities
				}
			});
		}

		case wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_FAIL: {
			return state;
		}

		case wallModerationAction.ActionTypes.WALL_HIDE_FEED: {
			const id = action.payload;
			const newFeeds = hideFeed(state.response.filteredEntities, id);
			return Object.assign({}, state, {
				response: {
					...state.response,
					filteredEntities: newFeeds,
					hiddenFeedId: [...state.response.hiddenFeedId, id]
				}
			});
		}

		case wallModerationAction.ActionTypes.WALL_SHOW_FEED: {
			const id = action.payload;
			const newEntities = showFeed(state.response.entities, state.response.filteredEntities, id);
			const newHiddenFeedId = removeId(state.response.hiddenFeedId, id);
			return Object.assign({}, state, {
				response: {
					...state.response,
					filteredEntities: newEntities,
					hiddenFeedId: newHiddenFeedId
				}
			});
		}

		case wallModerationAction.ActionTypes.WALL_BLOCK_USER: {
			const user = action.payload;
			const blockedUser = [...state.response.blockedUser, user];
			const newFeeds = accountExclusion(state.response.filteredEntities, blockedUser);
			return Object.assign({}, state, {
				response: {
					...state.response,
					filteredEntities: newFeeds,
					blockedUser
				}
			});
		}

		case wallModerationAction.ActionTypes.WALL_UNBLOCK_USER: {
			const user = action.payload;
			const newEntities = accountInclusion(state.response.entities, state.response.filteredEntities, user);
			const newBlockedUser = removeId(state.response.hiddenFeedId, user);
			return Object.assign({}, state, {
				response: {
					...state.response,
					filteredEntities: newEntities,
					blockedUser: newBlockedUser
				}
			});
		}

		case wallModerationAction.ActionTypes.WALL_PROFANITY_CHANGE_ACTION: {
			const profanityCheck = action.payload;
			const filteredEntities = profanityFilter(state.response.filteredEntities);
			return Object.assign({}, state, {
				response: {
					...state.response,
					filteredEntities,
					profanityCheck
				}
			});
		}

		case wallModerationAction.ActionTypes.WALL_REMOVE_DUPLICATE_CHANGE_ACTION: {
			const removeDuplicate = action.payload;
			const filteredEntities = removeDuplicateCheck(state.response.filteredEntities);
			return Object.assign({}, state, {
				response: {
					...state.response,
					filteredEntities,
					removeDuplicate
				}
			});
		}

		default: {
			return state;
		}
	}
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.response.entities;

export const getFilteredEntities = (state: State) => state.response.filteredEntities;

export const getHiddenFeedId = (state: State) => state.response.hiddenFeedId;

export const getBlockedUser = (state: State) => state.response.blockedUser;

export const getProfanityCheck = (state: State) => state.response.profanityCheck;

export const getDuplicateRemove = (state: State) => state.response.removeDuplicate;
