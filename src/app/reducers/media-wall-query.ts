import { createSelector } from 'reselect';
import { Query } from '../models/query';
import * as mediaWallAction from '../actions/media-wall-query';
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

export function reducer(state: State = initialState, action: mediaWallAction.Actions): State {
	switch (action.type) {

		case mediaWallAction.ActionTypes.WALL_INPUT_VALUE_CHANGE: {
			const query = action.payload;

			return Object.assign({}, state, {
			query: {
				...state.query,
				queryString: query
			}
			});
		}

		default: {
			return state;
		}
	}
}


export const getMediaWallQuery = (state: State) => state.query;
