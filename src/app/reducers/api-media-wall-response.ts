import { createSelector } from 'reselect';
import { ApiResponse, ApiResponseResult } from '../models/api-response';
import * as apiAction from '../actions/api';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import { removeDuplicate } from '../utils'

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [entities: ApiResponseResult[]] array of response items returned by the api.
 * @prop [lastResponseLength: number] Keeps a check on the length of entities for media wall.
 */
export interface State {
	entities: ApiResponseResult[];
	lastResponseLength: number;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: entities: []
 * @prop: lastResponeLength: 0
 */
export const initialState: State = {
	entities: [],
	lastResponseLength: 0
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState, action: apiAction.Actions | wallPaginationAction.Actions): State {
	switch (action.type) {
		case apiAction.ActionTypes.WALL_SEARCH_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;

			return Object.assign({}, state, {
				entities: apiResponse.statuses,
				lastResponseLength: apiResponse.statuses.length
			});
		}

		case apiAction.ActionTypes.WALL_SEARCH_COMPLETE_FAIL: {
			return state;
		}

		case wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;
			const filteredResponse = removeDuplicate(state.entities, apiResponse.statuses);

			return Object.assign({}, state, {
				entities: [ ...filteredResponse, ...state.entities ],
				lastResponseLength: apiResponse.statuses.length
			});
		}

		case wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_FAIL: {
			return state;
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

export const getEntities = (state: State) => state.entities;

export const getLastResponseLength = (state: State) => state.lastResponseLength;
