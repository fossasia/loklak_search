import * as userQueryAction from '../actions/user-query';
import { UserQuery } from '../models';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains two properties:
 * @prop [query: Query] Query object on which the search is based.
 *
 */
export interface State {
	query: UserQuery;
}

/**
 * Initial Query state which is passed onto the store.
 */
const queryInitialState: UserQuery =  {
	screen_name: ''
};

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: query: ''
 * @prop: loading: false
 */
export const initialState: State = {
	query: queryInitialState,
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer cotrols that part of the state which is shows the state of the application
 * wheather it is searching and what is it searching for.
 */
export function reducer(state: State = initialState, action: userQueryAction.Actions): State {
	switch (action.type) {
		case userQueryAction.ActionTypes.VALUE_CHANGE: {
			const screen_name: string = action.payload;

			return Object.assign({}, state, {
				query: {
					...state.query,
					screen_name
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

export const getQuery = (state: State) => state.query;

export const getQueryScreenName = (state: State) => state.query.screen_name;
