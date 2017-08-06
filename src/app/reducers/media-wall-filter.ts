import { createSelector } from 'reselect';
import * as wallFilterAction from '../actions/media-wall-filter';
import { cut } from '../utils';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop profanityFilter: Boolean to detect if profanity filter must be applied
 * @prop excludeUserAccount: Boolean to detect if some user account must be excluded
 * @prop userAccountNames: Array of string to store
 */
export interface State {
	profanityFilter: boolean;
	excludeUserAccount: boolean;
	userAccountNames: string;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: profanityFilter: false
 * @prop: excludeUserAccount: false
 * @prop: userAccountNames: []
 */
export const initialState: State = {
	profanityFilter: false,
	excludeUserAccount: false,
	userAccountNames: ''
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState, action: wallFilterAction.Actions): State {
	switch (action.type) {
		case wallFilterAction.ActionTypes.WALL_PROFANITY_CHECK: {
			return Object.assign({}, state, {
				profanityFilter: action.payload
			});
		}

		case wallFilterAction.ActionTypes.WALL_ACCOUNT_EXCLUSION: {
			const userNamesString = action.payload;
			return Object.assign({}, state, {
				excludeUserAccount: userNamesString,
				userAccountNames: userNamesString
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

export const isProfanityFilter = (state: State) => state.profanityFilter;

export const isExcludeUserAccount = (state: State) => state.excludeUserAccount;

export const excludeUserAccountNames = (state: State) => state.userAccountNames;
