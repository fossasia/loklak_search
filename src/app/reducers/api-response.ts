import { createSelector } from 'reselect';
import { ApiResponse, ApiResponseResult, ApiResponseMetadata, ApiResponseUser } from '../models/api-response';
import * as api from '../actions/api';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [metadata: ApiResponseMetadata] metadata of the response which comes from api
 * @prop [entities: ApiResponseResult[]] array of response items returned by the api.
 * @prop [hashtags: Array<{ tag: string, count: number }>] array of hashtags computed from entities.
 * @prop [valid: boolean] shows the validity of data present in state.
 * 												Used to detect wheather the loading has been success/fail.
 */
export interface State {
	metadata: ApiResponseMetadata;
	entities: ApiResponseResult[];
	hashtags: Array<{ tag: string, count: number }>;
	valid: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: metadata: null
 * @prop: entities: []
 * @prop: hashtags: []
 * @prop: valid: true
 */
const initialState: State = {
	metadata: null,
	entities: [],
	hashtags: [],
	valid: true
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState, action: api.Actions): State {
	switch (action.type) {
		case api.ActionTypes.SEARCH_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;

			let tagStrings = [].concat(...apiResponse.statuses.map((a) => (a.hashtags)));
			let hashtags = Array.from(new Set(tagStrings)).map(tag => {
					return { tag, count: tagStrings.filter(y => y === tag).length };
			}).sort((a, b) => (b.count - a.count));

			return {
				metadata: apiResponse.search_metadata,
				entities: apiResponse.statuses,
				hashtags,
				valid: true
			};
		}

		case api.ActionTypes.SEARCH_COMPLETE_FAIL: {
			return Object.assign({}, state, {
				valid: false
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

export const getMetadata = (state: State) => state.metadata;

export const getHashtags = (state: State) => state.hashtags;

export const isResultValid = (state: State) => state.valid;
