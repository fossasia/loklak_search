import { createSelector } from 'reselect';
import { Query } from '../models/query';

import * as apiAction from '../actions/api';
import * as mediaWallAction from '../actions/media-wall';
import { ApiResponse } from '../models/api-response';


export interface State {
	query: Query;
}

export const initialState: State = {
	query: {
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
		from: false
	}
};

export function reducer(state: State = initialState, action: mediaWallAction.Actions | apiAction.Actions): State {
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
