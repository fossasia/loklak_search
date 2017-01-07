import { createSelector } from 'reselect';
import * as lightbox from '../actions/lightbox';
import { ApiResponseResult} from '../models/api-response';

export interface State {
	feedItem: ApiResponseResult;
}


export function reducer(state: State , action: lightbox.Actions): State {
	switch (action.type) {
		case lightbox.ActionTypes.UPDATE_TWEET: {
			const feedData = action.payload;
			return {
				feedItem: feedData
			};
		}
	}

}

export const feedItem = (state: State) => state.feedItem;




