import { createSelector } from 'reselect';

import * as queryAction from '../actions/query';
import { Query, ReloactionAfterQuery, fromRegExp, followersRegExp,
					FilterList, TimeBound  } from '../models';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains two properties:
 * @prop [query: Query] Query object on which the search is based.
 *
 */
export interface State {
	query: Query;
}

/**
 * Initial Query state which is passed onto the store.
 */
const queryInitialState: Query =  {
	displayString: '',
	queryString: '',
	location: ReloactionAfterQuery.NONE,
	filter: {
		audio: false,
		video: false,
		images: false
	},
	near: null,
	timeBound: {
		since: null,
		until: null
	},
	from: false,
	followers: false
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
export function reducer(state: State = initialState, action: queryAction.Actions): State {
	switch (action.type) {
		case queryAction.ActionTypes.VALUE_CHANGE: {
			const query: any = action.payload;
			const isFromQuery: boolean = (fromRegExp.exec(query)) ? true : false;
			const isFollowerQuery: boolean = (followersRegExp.exec(query)) ? true : false;

			return Object.assign({}, state, {
				query: {
					...state.query,
					displayString: query,
					from: isFromQuery,
					follower: isFollowerQuery
				}
			});

		}

		case queryAction.ActionTypes.FILTER_CHANGE: {
			const filterList: any = action.payload;

			return Object.assign({}, state, {
				query: {
					...state.query,
					filter: filterList
				}
			});
		}

		case queryAction.ActionTypes.TIME_BOUND_CHANGE: {
			const timeBoundSet: any = action.payload;

			return Object.assign({}, state, {
				query: {
					...state.query,
					timeBound: timeBoundSet
				}
			});
		}

		case queryAction.ActionTypes.LOCATION_CHANGE: {
			const location: any = action.payload;

			return Object.assign({}, state, {
				query: {
					...state.query,
					near: location
				}
			});
		}

		case queryAction.ActionTypes.QUERY_CHANGE: {

			return Object.assign({}, state, {
				query: {
					...state.query,
					queryString: state.query.displayString
				}
			});
		}

		case queryAction.ActionTypes.RELOCATION_ATTR_CHANGE: {

			return Object.assign({}, state, {
				query: {
					...state.query,
					location: ReloactionAfterQuery.RELOCATE
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

export const getQueryString = (state: State) => state.query.queryString;

export const getDisplayString = (state: State) => state.query.displayString;

export const getFilterList = (state: State) => state.query.filter;

export const getTimeBoundSet = (state: State) => state.query.timeBound;

export const getLocation = (state: State) => state.query.near;

export const isFromQuery = (state: State) => state.query.from;

export const isFollowerQuery = (state: State) => state.query.followers;
