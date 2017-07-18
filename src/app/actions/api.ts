import { Action } from '@ngrx/store';
import { Query, ApiResponse, ApiResponseTrendingHashtags } from '../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	SEARCH: '[Api] Search',
	SEARCH_COMPLETE_SUCCESS: '[Api] Search Complete Success',
	SEARCH_COMPLETE_FAIL: '[Api] Search Complete Fail',
	SEARCH_TRENDING_HASHTAGS_SUCCESS: '[Api] Search Trending Hashtags Success Action',
	SEARCH_TRENDING_HASHTAGS_FAIL: '[Api] Search Trending Hashtags Fail Action',
	WALL_SEARCH_COMPLETE_SUCCESS: '[Api] Media Wall Search Complete Success Action',
	WALL_SEARCH_COMPLETE_FAIL: '[Api] Media Wall Search Complete Fail Action'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class SearchAction implements Action {
	type = ActionTypes.SEARCH;

	constructor(public payload: Query) {  }
}

export class SearchCompleteSuccessAction implements Action {
	type = ActionTypes.SEARCH_COMPLETE_SUCCESS;

	constructor(public payload: ApiResponse) { }
}

export class SearchCompleteFailAction implements Action {
	type = ActionTypes.SEARCH_COMPLETE_FAIL;

	constructor(public payload: any) { }
}

export class SearchTrendingHashtagsSuccessAction implements Action {
	type = ActionTypes.SEARCH_TRENDING_HASHTAGS_SUCCESS;

	constructor(public payload?: ApiResponseTrendingHashtags) { }
}

export class SearchTrendingHashtagsFailAction implements Action {
	type = ActionTypes.SEARCH_TRENDING_HASHTAGS_FAIL;

	constructor(public payload?: any) { }
}

export class WallSearchCompleteSuccessAction implements Action {
	type = ActionTypes.WALL_SEARCH_COMPLETE_SUCCESS;

	constructor(public payload: ApiResponse) { }
}

export class WallSearchCompleteFailAction implements Action {
	type = ActionTypes.WALL_SEARCH_COMPLETE_FAIL;

	constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= SearchAction
	| SearchCompleteSuccessAction
	| SearchCompleteFailAction
	| SearchTrendingHashtagsSuccessAction
	| SearchTrendingHashtagsFailAction
	| WallSearchCompleteSuccessAction
	| WallSearchCompleteFailAction;
