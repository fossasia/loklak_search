import { createSelector } from 'reselect';
import * as wallPaginationAction from '../actions/media-wall-pagination';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [entities: ApiResponseResult[]] array of response items returned by the api.
 * @prop [valid: boolean] shows the validity of data present in state.
 * 												Used to detect wheather the loading has been success/fail.
 */
export interface State {
	wallPaginating: boolean;
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
export const initialState: State = {
	wallPaginating: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState, action: wallPaginationAction.Actions): State {
	switch (action.type) {
		case wallPaginationAction.ActionTypes.WALL_NEXT_PAGE: {
			return Object.assign({}, state, {
				wallPaginating: true
			});
		}
		case wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_SUCCESS:
		case wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_FAIL: {

			return Object.assign({}, state, {
				wallPaginating: false
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

export const isWallPaginating = (state: State) => state.wallPaginating;
