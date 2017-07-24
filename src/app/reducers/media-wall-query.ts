import { createSelector } from 'reselect';
import { Query } from '../models/query';
import * as mediaWallAction from '../actions/media-wall-query';
import { ApiResponse } from '../models/api-response';
import { fromRegExp } from '../utils';


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

export function reducer(state: State = initialState, action: mediaWallAction.Actions): State {
	switch (action.type) {

		case mediaWallAction.ActionTypes.WALL_QUERY_CHANGE: {
			const query = action.payload;
			const fromCheck = fromRegExp.exec(query);
			const isFromQuery: boolean = (fromCheck) ? true : false;
			let displayQuery = query;
			if (isFromQuery) {
				displayQuery = '@' + fromCheck[1];
			}

			return Object.assign({}, state, {
			query: {
				...state.query,
				queryString: query,
				displayString: displayQuery
			}
			});
		}

		default: {
			return state;
		}
	}
}


export const getMediaWallQuery = (state: State) => state.query;
