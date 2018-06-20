import { ApiResponseTrendingHashtags } from '../models/api-response';
import * as apiActions from '../actions/api';

/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [hashtags: ApiResponseTrendingHashtags]
 */
export interface State {
	hashtags: ApiResponseTrendingHashtags;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop [hashtags: ApiResponseTrendingHashtags] : null
 */
export const initialState: State = {
	hashtags: null
};

export function reducer(state: State = initialState, action: apiActions.Actions): State {
	switch (action.type) {
		case apiActions.ActionTypes.SEARCH_TRENDING_HASHTAGS_SUCCESS: {
			const apiResponse = action.payload;

			return Object.assign({}, state, {
				hashtags: apiResponse
			});
		}

		case apiActions.ActionTypes.SEARCH_TRENDING_HASHTAGS_FAIL: {
			return Object.assign({}, state, {
				hashtags: null
			});
		}

		default: {
			return state;
		}
	}
}

export const getHashtags = (state: State) => state.hashtags;
