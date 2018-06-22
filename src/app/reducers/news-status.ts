import * as newsStatusAction from '../actions/news';

/**
 * Each reducer module must import the local `State` which it controls.
 */
export interface State {
	newsStatus: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 */
export const initialState: State = {
	newsStatus: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 */
export function reducer(state: State = initialState, action: newsStatusAction.NewsStatusAction): State {
	switch (action.type) {
		case newsStatusAction.ActionTypes.NEWS_STATUS: {

			const newsStatusPayload: boolean = action.payload;
			return Object.assign({}, state, {
				newsStatus: newsStatusPayload
			});
		}

		default: {
			return state;
		}
	}
}


/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getNewsStatus = (state: State) => state.newsStatus;
