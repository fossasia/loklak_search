import { createSelector } from 'reselect';
import { Query, parseQueryToQueryString, parseQueryToRouterString, FilterList } from '../models';
import * as mediaWallAction from '../actions/media-wall-query';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import { ApiResponse } from '../models/api-response';


export interface State {
	query: Query;
}

export const initialState: State = {
	query: {
		displayString: '',
		queryString: '',
		routerString: '',
		filter: {
			video: false,
			image: false
		},
		location: null,
		timeBound: {
			since: null,
			until: null
		},
		from: false
	}
};

export function reducer(state: State = initialState, action: mediaWallAction.Actions | wallPaginationAction.Actions): State {
	switch (action.type) {

		case mediaWallAction.ActionTypes.WALL_VALUE_CHANGE: {
			const query: any = action.payload;

			return Object.assign({}, state, {
				query: {
					...state.query,
					displayString: query,
					queryString: query
				}
			});

		}

		case mediaWallAction.ActionTypes.WALL_QUERY_CHANGE: {
			const queryPayload = action.payload;
			if (queryPayload) {
				const query = Object.assign({}, queryPayload, {
					...queryPayload,
					queryString: parseQueryToQueryString(queryPayload),
					routerString: parseQueryToRouterString(queryPayload)
				});
				return Object.assign({}, state, {
					query
				});
			}
			else {
				return Object.assign({}, state, {
					query: {
						...state.query,
						queryString: state.query.displayString,
						routerString: state.query.displayString
					}
				});
			}
		}

		default: {
			return state;
		}
	}
}


export const getMediaWallQuery = (state: State) => state.query;
