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

			return Object.assign({}, state, {
			query: {
				...state.query,
				queryString: query,
				displayString: query,
			}
			});
		}

		default: {
			return state;
		}
	}
}


export const getMediaWallQuery = (state: State) => state.query;
