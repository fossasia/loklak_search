import * as userApiAction from '../actions/user-api';
import { UserApiResponse } from '../models/api-user-response';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 */
export interface State {
	user: UserApiResponse;
	followers: UserApiResponse[];
	following: UserApiResponse[];
	valid: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
*/
export const initialState: State = {
	user: null,
	followers: [],
	following: [],
	valid: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer cotrols that part of the state which is shows the state of the application
 * wheather the userDetails are being retrieved and the userDetails.
 */
export function reducer(state: State = initialState, action: userApiAction.Actions): State {
	switch (action.type) {

		case userApiAction.ActionTypes.USER_SEARCH_COMPLETE_SUCCESS: {
			const userResponse = action.payload;

			return Object.assign({}, state, {
				user: userResponse.user,
				followers: userResponse.topology.followers,
				following: userResponse.topology.following,
				valid: true
			});
		}
		case userApiAction.ActionTypes.USER_SEARCH_COMPLETE_FAIL: {

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

export const getUserResponse = (state: State) => state.user;

export const getUSerFollowers = (state: State) => state.followers;

export const getUserFollowing = (state: State) => state.following;

export const isResultValid = (state: State) => state.valid;
