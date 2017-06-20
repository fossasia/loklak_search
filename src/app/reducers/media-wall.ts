import { createSelector } from 'reselect';
import { Query } from '../models/query';

import * as apiAction from '../actions/api';
import * as mediaWallAction from '../actions/media-wall';
import { ApiResponse } from '../models/api-response';


export interface State {
	MediaWallColor;
	media: string[];
	query: Query;
}

export const initialState: State = {
	MediaWallColor: {
	accent: '#ffcc11',
	text: '#666666',
	background: '#ffffff'
},
	media: [],
	query: {
		displayString: '',
		queryString: '',
		filter: {
			audio: false,
			video: false,
			images: false
		},
		location: null,
		timeBound: {
			since: null,
			until: null
		},
		from: false,
		followers: false
	}
};

export function reducer(state: State = initialState, action: mediaWallAction.Actions | apiAction.Actions): State {
	switch (action.type) {
		case mediaWallAction.ActionTypes.NEW_COLOR_ACCENT: {
			const color = action.payload;

			return Object.assign({}, state, {
				MediaWallsColor: {
					...state.MediaWallColor,
					accent: color
				}
			});
		}

		case mediaWallAction.ActionTypes.NEW_COLOR_TEXT: {
			const color = action.payload;

			return Object.assign({}, state, {
			MediaWallsColor: {
				...state.MediaWallColor,
					text: color
				}
			});
		}

		case mediaWallAction.ActionTypes.NEW_COLOR_BACKGROUND: {
			const color = action.payload;

			return Object.assign({}, state, {
			MediaWallsColor: {
				...state.MediaWallColor,
					background: color
				}
			});
		}

		case mediaWallAction.ActionTypes.WALL_INPUT_VALUE_CHANGE: {
			const query = action.payload;

			return Object.assign({}, state, {
			query: {
				...state.query,
				queryString: query
			}
			});
		}

		case apiAction.ActionTypes.SEARCH_COMPLETE_SUCCESS: {
			const apiResponse = action.payload;
			const media = [];
			apiResponse.statuses.forEach(status => {
				status.images.forEach(element => {
					const img1 = new RegExp('https:\\/\\/abs\\.twimg\\.com\\/');
					const img2 = new RegExp('https:\\/\\/pic\\.twitter\\.com\\/');
					const img3 = new RegExp('https:\\/\\/www\\.instagram\\.com\\/');
					const res1 = img1.exec(element);
					const res2 = img2.exec(element);
					const res3 = img3.exec(element);
					if (res1 === null && res2 === null && res3 === null) {
						media.push(element);
					}
				});
			});
			return Object.assign({}, state, {
				media
			});
		}

		default: {
			return state;
		}
	}
}


export const getMediaWallColor = (state: State) => state.MediaWallColor;

export const getMediaElements = (state: State) => state.media;

export const getMediaWallQuery = (state: State) => state.query;
