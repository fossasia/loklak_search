import { createSelector } from 'reselect';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';


/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze/src';

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
import * as fromQuery from './query';
import * as fromUserQuery from './user-query';
import * as fromSearch from './search';
import * as fromUserSearch from './user-search';
import * as fromTitle from './title';
import * as fromTrends from './trends';
import * as fromApiResponse from './api-response';
import * as fromApiTrendsResponse from './api-trends-response';
import * as fromPagination from './pagination';
import * as fromApiUserResponse from './api-user-response';
import * as fromSuggest from './suggest';
import * as fromSuggestResponse from './suggest-response';
import * as fromMediaWallQuery from './media-wall-query';
import * as fromMediaWallSearch from './media-wall-search';
import * as fromMediaWallResponse from './api-media-wall-response';
import * as fromMediaWallCustom from './media-wall-custom';
import * as fromMediaWallPagination from './media-wall-pagination';
import * as fromMediaWallDesign from './media-wall-design';
import * as fromMediaWallDirectUrl from './media-wall-direct-url';
import * as fromSpeech from './speech';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
	query: fromQuery.State;
	trends: fromTrends.State;
	userQuery: fromUserQuery.State;
	search: fromSearch.State;
	userSearch: fromUserSearch.State;
	apiResponse: fromApiResponse.State;
	apiTrendsResponse: fromApiTrendsResponse.State;
	pagination: fromPagination.State;
	apiUserResponse: fromApiUserResponse.State;
	suggestService: fromSuggest.State;
	suggestResponse: fromSuggestResponse.State;
	mediaWallQuery: fromMediaWallQuery.State;
	mediaWallResponse: fromMediaWallResponse.State;
	mediaWallSearch: fromMediaWallSearch.State;
	mediaWallCustom: fromMediaWallCustom.State;
	mediaWallPagination: fromMediaWallPagination.State;
	mediaWallDesign: fromMediaWallDesign.State;
	mediaWallDirectUrl: fromMediaWallDirectUrl.State;
	speech: fromSpeech.State;
	title: fromTitle.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers: ActionReducerMap<State> = {
	query: fromQuery.reducer,
	userQuery: fromUserQuery.reducer,
	search: fromSearch.reducer,
	userSearch: fromUserSearch.reducer,
	trends: fromTrends.reducer,
	title: fromTitle.reducer,
	apiResponse: fromApiResponse.reducer,
	apiTrendsResponse: fromApiTrendsResponse.reducer,
	pagination: fromPagination.reducer,
	apiUserResponse: fromApiUserResponse.reducer,
	suggestService: fromSuggest.reducer,
	suggestResponse: fromSuggestResponse.reducer,
	mediaWallQuery: fromMediaWallQuery.reducer,
	mediaWallResponse: fromMediaWallResponse.reducer,
	mediaWallSearch: fromMediaWallSearch.reducer,
	mediaWallCustom: fromMediaWallCustom.reducer,
	mediaWallPagination: fromMediaWallPagination.reducer,
	mediaWallDesign: fromMediaWallDesign.reducer,
	mediaWallDirectUrl: fromMediaWallDirectUrl.reducer,
	speech: fromSpeech.reducer
};

export const metaReducers: MetaReducer<State>[] =
	!environment.production ? [storeFreeze] : [];

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
export const getApiResponsePages = createSelector(getApiResponseState, fromApiResponse.getPages);
export const getApiResponseTags = createSelector(getApiResponseState, fromApiResponse.getHashtags);
export const getAreResultsValid = createSelector(getApiResponseState, fromApiResponse.isResultValid);
export const getLastRecordIndex = createSelector(getApiResponseState, fromApiResponse.lastRecord);
export const getApiAggregations = createSelector(getApiResponseState, fromApiResponse.getAggregations);

/**
 * Just like with the ApiResponse selectors, we also have to compose the
 * search reducer's and collection reducer's selectors.
 */
export const getSearchState = (state: State) => state.search;

export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

/**
 * Selector for User Search
 */
export const getUserSearchState = (state: State) => state.search;

export const getUserSearchLoading = createSelector(getUserSearchState, fromUserSearch.getLoading);

/**
 * Selector for Query
 */
export const getQueryState = (state: State) => state.query;

export const getQuery = createSelector(getQueryState, fromQuery.getQuery);
export const getQueryDisplayString = createSelector(getQueryState, fromQuery.getDisplayString);
export const getQuerySearchString = createSelector(getQueryState, fromQuery.getQueryString);
export const getQueryFilterList = createSelector(getQueryState, fromQuery.getFilterList);
export const getQueryTimeBoundSet = createSelector(getQueryState, fromQuery.getTimeBoundSet);
export const getQueryLocation = createSelector(getQueryState, fromQuery.getLocation);
export const getIsFromQuery = createSelector(getQueryState, fromQuery.getIsFromQuery);

/**
 * Selector for User Query
 */
export const getUserQueryState = (state: State) => state.userQuery;

export const getUserQuery = createSelector(getUserQueryState, fromUserQuery.getQuery);
export const getUserQuerySceenName = createSelector(getUserQueryState, fromUserQuery.getQueryScreenName);

/**
 * Selectors For Pageination.
 */
export const getPaginationState = (state: State) => state.pagination;

export const getPaginationPage = createSelector(getPaginationState, fromPagination.getPage);
export const getPageLoading = createSelector(getPaginationState, fromPagination.getPageLoading);
export const getPagesAvailable = createSelector(getPaginationState, fromPagination.getPagesAvailable);

/**
 * Selectors for UserApiResponse
 */

export const getApiUserResponseState = (state: State) => state.apiUserResponse;

export const getApiUserResponse = createSelector(getApiUserResponseState, fromApiUserResponse.getUserResponse);
export const getApiUserFollowersResponse = createSelector(getApiUserResponseState, fromApiUserResponse.getUSerFollowers);
export const getApiUserFollowingResponse = createSelector(getApiUserResponseState, fromApiUserResponse.getUserFollowing);
export const getAreApiUserResultsValid = createSelector(getApiUserResponseState, fromApiUserResponse.isResultValid);

/**
 * Selectors For Suggest
 */
export const getSuggestState = (state: State) => state.suggestService;

export const getSuggestQuery = createSelector(getSuggestState, fromSuggest.getQuery);
export const getSuggestLoading = createSelector(getSuggestState, fromSuggest.getLoading);

/**
 * Selectors For Suggest Response
 */
export const getSuggestResponseState = (state: State) => state.suggestResponse;

export const getSuggestResponseEntities = createSelector(getSuggestResponseState, fromSuggestResponse.getEntities);
export const isSuggestResponseValid = createSelector(getSuggestResponseState, fromSuggestResponse.isResultValid);
export const getSuggestServiceLastResponse = createSelector(getSuggestResponseState, fromSuggestResponse.lastRecord);

/**
 * Selectors For Trends
 */
export const getTrendsState = (state: State) => state.trends;

export const getAreTrendsLoading = createSelector(getTrendsState, fromTrends.getLoading);

/**
 * Selectors For ApiTrendsResponse
 */
export const getApiTrendsResponseState = (state: State) => state.apiTrendsResponse;

export const getApiHashtagTrends = createSelector(getApiTrendsResponseState, fromApiTrendsResponse.getHashtags);

/**
 * Selectors For Title
 */
export const getTitleState = (state: State) => state.title;

export const getTitle = createSelector(getTitleState, fromTitle.getTitle);

/**
 * Selectors for Media Wall Query
 */
export const getMediaWallState = (state: State) => state.mediaWallQuery;

export const getMediaWallQuery = createSelector(getMediaWallState, fromMediaWallQuery.getMediaWallQuery);

/**
 * Selectors for Media Wall Search
 */

export const getMediaWallSearchState = (state: State) => state.mediaWallSearch;

export const getMediaWallLoading = createSelector(getMediaWallSearchState, fromMediaWallSearch.getLoading);

/**
 * Selector for Media Wall Pagination
 */

export const getMediaWallPaginationState = (state: State) => state.mediaWallPagination;

export const isWallPaginating = createSelector(getMediaWallPaginationState, fromMediaWallPagination.isWallPaginating);

/**
 * Selector for Media Wall Customization
 */

export const getMediaWallCustomState = (state: State) => state.mediaWallCustom;

export const getMediaWallCustomHeader = createSelector(getMediaWallCustomState, fromMediaWallCustom.getCustomWallHeader);
export const getMediaWallCustomBackground = createSelector(getMediaWallCustomState, fromMediaWallCustom.getCustomWallBackground);
export const getMediaWallCustomCard = createSelector(getMediaWallCustomState, fromMediaWallCustom.getCustomWallCard);

/**
 * Selector for Media Wall Design
 */

export const getMediaWallDesignState = (state: State) => state.mediaWallDesign;

export const getWallDisplayHeader = createSelector(getMediaWallDesignState, fromMediaWallDesign.getWallDisplayHeader);
export const getWallHeaderTitle = createSelector(getMediaWallDesignState, fromMediaWallDesign.getWallHeaderTitle);
export const getWallColumnCount = createSelector(getMediaWallDesignState, fromMediaWallDesign.getWallColumnCount);
export const getWallCount = createSelector(getMediaWallDesignState, fromMediaWallDesign.getWallCount);
export const getWallCardStyle = createSelector(getMediaWallDesignState, fromMediaWallDesign.getWallCardStyle);


/**
 * Selector for Media Wall Direct URL
 */

export const getMediaWallDirectUrlState = (state: State) => state.mediaWallDirectUrl;

export const getMediaWallDirectUrl = createSelector(getMediaWallDirectUrlState, fromMediaWallDirectUrl.getMediaWallDirectUrl);
export const getMediaWallShortenedUrl = createSelector(getMediaWallDirectUrlState, fromMediaWallDirectUrl.getMediaWallShortenedtUrl);
/**
 * Selectors for Media Wall Response
 */

export const getMediaWallResponseState = (state: State) => state.mediaWallResponse;

export const getMediaWallResponseEntities = createSelector(getMediaWallResponseState, fromMediaWallResponse.getEntities);
export const getMediaWallFilteredEntities = createSelector(getMediaWallResponseState, fromMediaWallResponse.getFilteredEntities);
export const getMediaWallBlockedUser = createSelector(getMediaWallResponseState, fromMediaWallResponse.getBlockedUser);
export const getMediaWallHiddenId = createSelector(getMediaWallResponseState, fromMediaWallResponse.getHiddenFeedId);
export const getMediaWallProfanityCheck = createSelector(getMediaWallResponseState, fromMediaWallResponse.getProfanityCheck);
export const getMediaWallDuplicateRemove = createSelector(getMediaWallResponseState, fromMediaWallResponse.getDuplicateRemove);

export const getAreWallResultsAvailable =
	createSelector(getMediaWallResponseEntities , entities => (entities.length) ? true : false );

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

export const getApiResponsePage = createSelector(getApiResponsePages, getPaginationPage, (pages, page) => pages[page]);
export const getPageEntities = createSelector(getApiResponsePages, getPaginationPage, (pages, page) => pages[page].statuses);

export const getIsUserSearchSuccess =
	createSelector(getUserSearchLoading, getAreApiUserResultsValid, (userSearchLoading, userResultsValid) => {
		return (!userSearchLoading && userResultsValid);
	});

export const getSpeechState = (state: State) => state.speech;

export const getspeechStatus = createSelector(getSpeechState, fromSpeech.getspeechStatus);
