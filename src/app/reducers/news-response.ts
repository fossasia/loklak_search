import * as newsSuccessAction from '../actions/newsSuccess';
import { ApiResponseResult } from '../models';

/**
 * Each reducer module must import the local `State` which it controls.
 */
export interface State {
	newsResponse: ApiResponseResult[];
}

/**
 * There is always a need of initial state to be passed onto the store.
 */
export const initialState: State = {
	newsResponse: [],
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 */
export function reducer(state: State = initialState, action: newsSuccessAction.NewsSearchSuccessAction): State {
	switch (action.type) {
		case newsSuccessAction.ActionTypes.NEWS_SEARCH_SUCCESS: {
			// Appending the new result
			return Object.assign({}, state, {
				newsResponse: [...action.payload.statuses]
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

export const getNewsResponse = (state: State) => state.newsResponse;
