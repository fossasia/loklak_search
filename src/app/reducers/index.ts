import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { storeFreeze } from 'ngrx-store-freeze/src';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromSearch from './search';
import * as fromApiResponse from './api-response';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
	search: fromSearch.State;
	apiResponse: fromApiResponse.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
	search: fromSearch.reducer,
	apiResponse: fromApiResponse.reducer
};

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
	return productionReducer(state, action);
	// if (environment.production) {
	// 	return productionReducer(state, action);
	// }
	// else {
	// 	return developmentReducer(state, action);
	// }
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `repository` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.apiResponseState$ = state$.select(getApiResponseState);
 * 	}
 * }
 * ```
 */
export const getApiResponseState = (state: State) => state.apiResponse;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * Once again our compose function comes in handy. From right to left, we
 * first select the ApiResponse state then we pass the state to the repository
 * reducer's getApiResponseEntities selector, finally returning an observable
 * of search results.
 *
 * Share memoizes the selector functions and publishes the result. This means
 * every time you call the selector, you will get back the same result
 * observable. Each subscription to the resultant observable
 * is shared across all subscribers.
 */
export const getApiResponseEntities = createSelector(getApiResponseState, fromApiResponse.getEntities);
export const getApiResponseMetadata = createSelector(getApiResponseState, fromApiResponse.getMetadata);
export const getAreResultsValid = createSelector(getApiResponseState, fromApiResponse.isResultValid);


/**
 * Just like with the ApiResponse selectors, we also have to compose the
 * search reducer's and collection reducer's selectors.
 */
export const getSearchState = (state: State) => state.search;

export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search loading and result validity to return a boolean to indicate
 * wheather the results were found or not.
 */
export const getIsSearchSuccess =
	createSelector(getSearchLoading, getAreResultsValid, (searchLoading, resultsValid) => {
		return (!searchLoading && resultsValid);
	});

export const getAreResultsAvailable =
	createSelector(getApiResponseEntities, entities => (entities.length) ? true : false );
