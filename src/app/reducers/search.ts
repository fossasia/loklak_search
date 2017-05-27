import { createSelector } from 'reselect';
import * as api from '../actions/api';
import { Query, ReloactionAfterQuery, Media } from '../models/query';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains two properties:
 * @prop [query: string] query to be searched.
 * @prop [loading: boolean] to check wheather the query is being currently loaded.
 */
export interface State {
	query: Query;
	loading: boolean;
	showUserFeed: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: query: ''
 * @prop: loading: false
 */
const initialState: State = {
	query: { queryString: '', location: ReloactionAfterQuery.NONE, media: Media.all },
	loading: false,
	showUserFeed: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer cotrols that part of the state which is shows the state of the application
 * wheather it is searching and what is it searching for.
 */
export function reducer(state: State = initialState, action: api.Actions): State {
	switch (action.type) {
		case api.ActionTypes.SEARCH: {
			const query = action.payload;

			return Object.assign({}, state, {
				query,
				loading: true
			});
		}

		case api.ActionTypes.SEARCH_ALL_FEEDS: {

			return Object.assign({},state, {
				query: { queryString: state.query.queryString, location: ReloactionAfterQuery.RELOCATE, media: Media.all },
				loading: true
			})
		}

		case api.ActionTypes.SEARCH_IMAGES_FEEDS: {

			return Object.assign({},state, {
				query: { queryString: state.query.queryString, location: ReloactionAfterQuery.RELOCATE, media: Media.image },
				loading: true
			})
		}

		case api.ActionTypes.SEARCH_VIDEOS_FEEDS: {

			return Object.assign({},state, {
				query: { queryString: state.query.queryString, location: ReloactionAfterQuery.RELOCATE, media: Media.video },
				loading: true
			})
		}

		case api.ActionTypes.FETCH_USER: {
			const query = action.payload;

			return Object.assign({}, state, {
				query,
				loading: true
			})
		}

		case api.ActionTypes.SEARCH_COMPLETE_SUCCESS:
		case api.ActionTypes.SEARCH_COMPLETE_FAIL: {

			return Object.assign({}, state, {
				loading: false
			});
		}

		case api.ActionTypes.SHOW_SEARCH_RESULTS : {
			return Object.assign({}, state, {
				showUserFeed : false
			});
		}

		case api.ActionTypes.SHOW_USER_FEED : {
			return Object.assign({}, state, {
				showUserFeed : true
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

export const showUserFeed = (state: State) => state.showUserFeed;
