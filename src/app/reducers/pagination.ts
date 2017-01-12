import { createSelector } from 'reselect';
import * as pagination from '../actions/pagination';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains two properties:
 * @prop [page: string] page to be shown.
 */
export interface State {
	page: number;
	pageLoading: Boolean;
	pagesAvailable: Boolean;
}


/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: page: 0
 */
const initialState = {
	page: 0,
	pageLoading: false,
	pagesAvailable: true
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer cotrols that part of the state which is shows the state of the application
 * wheather it is searching and what is it searching for.
 */
export function reducer(state: State = initialState, action: pagination.Actions): State {
	switch (action.type) {
		case pagination.ActionTypes.NEXT_PAGE: {
			return Object.assign({}, state, {
				page: state.page + 1,
				pageLoading: true
			});
		}

		case pagination.ActionTypes.PAGINATION_COMPLETE_SUCCESS: {
			return Object.assign({}, state, {
				pageLoading: false,
				pagesAvailable: (action.payload.statuses.length < 30 ? false : true),
			});
		}

		case pagination.ActionTypes.PAGINATION_COMPLETE_FAIL: {
			return Object.assign({}, state, {
				page: state.page - 1,
				pageLoading: false,
				pagesAvailable: false
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

export const getPage = (state: State) => state.page;

export const getPageLoading = (state: State) => state.pageLoading;

export const getPagesAvailable = (state: State) => state.pagesAvailable;
