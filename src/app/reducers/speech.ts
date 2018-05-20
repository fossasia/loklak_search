import { Action } from '@ngrx/store';
import * as speech from '../actions/speech';

export const MODE_CHANGE = 'MODE_CHANGE';

export interface State {
	speechStatus: boolean;
}

export const initialState: State = {
	speechStatus: false
};

export function reducer(state: State = initialState, action: speech.Actions): State {
	switch (action.type) {
		case speech.ActionTypes.MODE_CHANGE: {
			const response = action.payload;
			return Object.assign({}, state, {speechStatus: response});
		}
		default: {
			return state;
		}
	}
}

export const getspeechStatus = (state: State) => state.speechStatus;
