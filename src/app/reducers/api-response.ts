import { createSelector } from 'reselect';
import { ApiResponse, ApiResponseResult, ApiResponseMetadata, ApiResponseUser, ApiResponseAggregations } from '../models/api-response';
import * as api from '../actions/api';
import * as pagination from '../actions/pagination';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [metadata: ApiResponseMetadata] metadata of the response which comes from api
 * @prop [entities: ApiResponseResult[]] array of response items returned by the api.
 * @prop [hashtags: Array<{ tag: string, count: number }>] array of hashtags computed from entities.
 * @prop [aggregations: ApiResponseAggregations] array of Mentions, Hashtags, Screen Names and Date Created.
 * @prop [valid: boolean] shows the validity of data present in state.
 * 												Used to detect wheather the loading has been success/fail.
 */
export interface State {
	pages: ApiResponse[];
	entities: ApiResponseResult[];
	hashtags: Array<{ tag: string, count: number }>;
	aggregations: ApiResponseAggregations;
	valid: boolean;
	selected: number;
	selectedavail: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: metadata: null
 * @prop: entities: []
 * @prop: hashtags: []
 * @prop: aggregations: null
 * @prop: valid: true
 */
const initialState: State = {
	pages: [],
	entities: [],
	hashtags: [],
	aggregations: null,
	valid: true,
	selected: null,
	selectedavail: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState, action: api.Actions | pagination.Actions): State {
	switch (action.type) {
		case api.ActionTypes.SEARCH_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;

			let tagStrings = [].concat(...apiResponse.statuses.map(item => item.hashtags));
			let hashtags = Array.from(new Set(tagStrings)).map(tag => {
					return { tag, count: tagStrings.filter(y => y === tag).length };
			});

			return {
				pages: [ apiResponse ],
				entities: apiResponse.statuses,
				hashtags,
				aggregations: apiResponse.aggregations,
				valid: true,
				selected: null,
				selectedavail: false
			};
		}

		case api.ActionTypes.SEARCH_COMPLETE_FAIL: {
			return Object.assign({}, state, {
				valid: false
			});
		}

		case pagination.ActionTypes.PAGINATION_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;

			let oldTagStrings = state.hashtags.map(hashtag => hashtag.tag);
			let tagStrings = oldTagStrings.concat(...apiResponse.statuses.map(item => item.hashtags));
			let hashtags = Array.from(new Set(tagStrings)).map(tag => {
					return { tag, count: tagStrings.filter(y => y === tag).length };
			});

			return Object.assign({}, state, {
				pages:	[...state.pages, apiResponse],
				entities: [...state.entities, ...apiResponse.statuses],
				hashtags: [...hashtags],
				aggregations: apiResponse.aggregations,
				valid: true
			});
		}

		case pagination.ActionTypes.PAGINATION_COMPLETE_FAIL: {
			return state;
		}

		case api.ActionTypes.SELECT_RESULT: {
			let present = (action.payload+1) ? true : false;
			return Object.assign({}, state, {
				selectedavail: present,
				selected: action.payload
			});
		}

		case api.ActionTypes.UNSELECT_RESULT: {
			return Object.assign({}, state, {
				selectavail: false,
				selected: null
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

export const getEntities = (state: State) => state.entities;

export const getPages = (state: State) => state.pages;

export const getHashtags = (state: State) => state.hashtags;

export const isResultValid = (state: State) => state.valid;

export const lastRecord = (state: State) => state.entities.length - 1;

export const getAggregations = (state: State) => state.aggregations;

export const isSelected = (state: State) => state.selectedavail;

export const getSelectedItem = (state: State) => state.entities[state.selected];
