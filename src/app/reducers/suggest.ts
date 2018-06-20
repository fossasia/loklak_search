import * as suggestAction from '../actions/suggest';
import { SuggestQuery } from '../models';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains two properties:
 * @prop [query: string] query to be searched.
 * @prop [loading: boolean] to check wheather the query is being currently loaded.
 */
export interface State {
	query: SuggestQuery;
	loading: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: query: ''
 * @prop: loading: false
 */
export const initialState: State = {
	query: {
		queryString: ''
	},
	loading: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer cotrols that part of the state which is shows the state of the application
 * wheather it is searching and what is it searching for.
 */
export function reducer(state: State = initialState, action: suggestAction.Actions): State {
	switch (action.type) {
		case suggestAction.ActionTypes.SUGGEST_QUERY: {
			const query = action.payload;

			return Object.assign({}, state, {
				query: {
					queryString: query
				},
				loading: true
			});
		}

		case suggestAction.ActionTypes.SUGGEST_COMPLETE_SUCCESS:
		case suggestAction.ActionTypes.SUGGEST_COMPLETE_FAIL: {

			return Object.assign({}, state, {
				loading: false
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

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;
