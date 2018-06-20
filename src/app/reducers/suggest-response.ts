import { SuggestMetadata, SuggestResults } from '../models/api-suggest';
import * as suggestAction from '../actions/suggest';

export interface State {
	metadata: SuggestMetadata;
	entities: SuggestResults[];
	valid: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: metadata: null
 * @prop: entities: []
 * @prop: valid: true
 */
export const initialState: State = {
	metadata: null,
	entities: [],
	valid: true
};

/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * results fetched from the API.
 */
export function reducer(state: State = initialState, action: suggestAction.Actions): State {
	switch (action.type) {
		case suggestAction.ActionTypes.SUGGEST_COMPLETE_SUCCESS: {
			const suggestResponse = action.payload;

			return {
				metadata: suggestResponse.suggest_metadata,
				entities: suggestResponse.queries,
				valid: true
			};
		}

		case suggestAction.ActionTypes.SUGGEST_COMPLETE_FAIL: {
			return Object.assign({}, state, {
				valid: false
			});
		}

		default: {
			return state;
		}
	}
}

export const getEntities = (state: State) => state.entities;

export const isResultValid = (state: State) => state.valid;

export const lastRecord = (state: State) => state.entities.length - 1;
