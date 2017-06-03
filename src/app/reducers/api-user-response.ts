import { createSelector } from 'reselect';
import * as api from '../actions/api';
import { UserApiResponse } from '../models/api-user-response';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 */
export interface State {
	user: UserApiResponse;
	followers: UserApiResponse[];
	following: UserApiResponse[];
	showUserInfo: boolean;
	loading: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
*/
const initialState: State = {
	user: null,
	followers: [],
	following: [],
	showUserInfo: false,
	loading: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer cotrols that part of the state which is shows the state of the application
 * wheather the userDetails are being retrieved and the userDetails.
 */
export function reducer(state: State = initialState, action: api.Actions): State {
	switch (action.type) {
		case api.ActionTypes.SEARCH: {
			return Object.assign({}, state, {
				user: null,
				showUserInfo: false,
				loading: true
			});
		}

		case api.ActionTypes.FETCH_USER: {

			return Object.assign({}, state, {
				showUserInfo: true,
				loading: true
			});
		}

		case api.ActionTypes.FETCH_USER_SUCCESS: {
			const userResponse = action.payload;
			return Object.assign({}, state, {
				user: userResponse.user,
				followers: userResponse.topology.followers,
				following: userResponse.topology.following,
				loading: false
			});
		}
		case api.ActionTypes.FETCH_USER_FAIL: {

			return Object.assign({}, state, {
				loading: false,
				showUserInfo: false
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

export const isUserResponseLoading = (state: State) => state.loading;

export const showUserInfo = (state: State) => state.showUserInfo;
