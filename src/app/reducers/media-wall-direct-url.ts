import * as mediaWallDirectUrlAction from '../actions/media-wall-direct-url';

export interface State {
	directUrl: string;
	shortenedUrl: string;
}

export const initialState: State = {
	directUrl: '',
	shortenedUrl: ''
};

export function reducer(state: State = initialState, action: mediaWallDirectUrlAction.Actions): State {
	switch (action.type) {

		case mediaWallDirectUrlAction.ActionTypes.WALL_GENERATE_DIRECT_URL: {
			const directUrl: any = action.payload;

			return Object.assign({}, state, {
				directUrl: ''
			});

		}

		case mediaWallDirectUrlAction.ActionTypes.WALL_SHORTEN_DIRECT_URL: {
			const directUrl: any = action.payload;

			return Object.assign({}, state, {
				directUrl
			});

		}

		default: {
			return state;
		}
	}
}

export const getMediaWallDirectUrl = (state: State) => state.directUrl;

export const getMediaWallShortenedtUrl = (state: State) => state.shortenedUrl;
