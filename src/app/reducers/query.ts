import { createSelector } from 'reselect';

import * as queryAction from '../actions/query';
import { Query, fromRegExp, FilterList, TimeBound, parseQueryToString } from '../models';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains two properties:
 * @extends Query Model
 *
 * @prop [displayString: string]: String which is used to display the meaningful parts of a query in text
 * @prop [queryString: string]: String which is used to query the API
 * @prop [filter: FilterList]: Set of filters which apply on the search
 * @prop [location: string]: The GeoLocation to display results on the basis of places
 * @prop [timeBound: TimeBound]: The time restricted set for the query.
 * @prop [from: boolean]: True if the query is of form "from:<query-term>"
 * @prop [relocateAfter: boolean]: If true the url will change after the query fetching is successful
 */
export interface State extends Query {
	relocateAfter: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 */
export const initialState: State = {
	displayString: '',
	queryString: '',
	filter: {
		audio: false,
		video: false,
		image: false
	},
	location: null,
	timeBound: {
		since: null,
		until: null
	},
	from: false,
	relocateAfter: false
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

			return Object.assign({}, state, {
				displayString: query,
				from: isFromQuery,
			});

		}

		case queryAction.ActionTypes.FILTER_CHANGE: {
			const filterList: any = action.payload;

			return Object.assign({}, state, {
				filter: filterList
			});
		}

		case queryAction.ActionTypes.TIME_BOUND_CHANGE: {
			const timeBound: any = action.payload;

			return Object.assign({}, state, {
				timeBound
			});
		}

		case queryAction.ActionTypes.LOCATION_CHANGE: {
			const location: any = action.payload;

			return Object.assign({}, state, {
				location
			});
		}

		case queryAction.ActionTypes.QUERY_CHANGE: {

			return Object.assign({}, state, {
				queryString: parseQueryToString(state)
			});
		}

		case queryAction.ActionTypes.RELOCATE_AFTER_QUERY_SET: {

			return Object.assign({}, state, {
				relocateAfter: true
			});
		}

		case queryAction.ActionTypes.RELOCATE_AFTER_QUERY_RESET: {

			return Object.assign({}, state, {
				relocateAfter: false
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

export const getQuery = (state: State) => state;

export const getQueryString = (state: State) => state.queryString;

export const getDisplayString = (state: State) => state.displayString;

export const getFilterList = (state: State) => state.filter;

export const getTimeBoundSet = (state: State) => state.timeBound;

export const getLocation = (state: State) => state.location;

export const isFromQuery = (state: State) => state.from;
