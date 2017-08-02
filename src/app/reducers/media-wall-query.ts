import { createSelector } from 'reselect';
import { Query } from '../models/query';
import * as mediaWallAction from '../actions/media-wall-query';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import { ApiResponse } from '../models/api-response';
import { parseDateToApiAcceptedFormat, fromRegExp } from '../utils';


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

		case mediaWallAction.ActionTypes.WALL_QUERY_CHANGE: {
			const query = action.payload;
			const fromCheck = fromRegExp.exec(query);
			const isFromQuery: boolean = (fromCheck) ? true : false;
			let displayQuery = query;
			if (isFromQuery) {
				displayQuery = '@' + fromCheck[1];
			}
			const todayDate = new Date();

			return Object.assign({}, state, {
			query: {
				...state.query,
				queryString: query,
				displayString: displayQuery,
				timeBound: {
					...state.query.timeBound,
					since: todayDate
				}
			}
			});
		}

		case wallPaginationAction.ActionTypes.WALL_NEXT_PAGE: {

			const newSinceDay = new Date (state.query.timeBound.since.setDate(state.query.timeBound.since.getDate() - 1));
			const newUntilDay = new Date (state.query.timeBound.since.setDate(state.query.timeBound.since.getDate() + 1));
			return Object.assign({}, state, {
				query: {
					...state.query,
					timeBound: {
						since: newSinceDay,
						until: newUntilDay
					}
				}
			});
		}

		default: {
			return state;
		}
	}
}


export const getMediaWallQuery = (state: State) => state.query;
