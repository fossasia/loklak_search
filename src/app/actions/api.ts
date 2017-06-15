import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';
import { Query } from '../models/query';
import { UserApiResponse, UserResponse } from '../models/api-user-response';

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
	SELECT_RESULT: '[Api] Select Lightbox',
	UNSELECT_RESULT: '[Api Unselect Lightbox',
	FETCH_USER: '[Api] Fetch User',
	FETCH_USER_SUCCESS: '[Api] Fetch User Success',
	FETCH_USER_FAIL: '[Api] Fetch User Fail',
	SHOW_USER_FEED: '[Api] Show User Feed',
	SHOW_SEARCH_RESULTS: '[Api] Show Search Results',
	SHOW_ALL_FEEDS: '[Api] Show all tweets',
	SHOW_IMAGES_FEEDS: '[Api] Show tweets with images',
	SHOW_VIDEOS_FEEDS: '[Api] Show tweets with videos'
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

export class SelectLightbox implements Action {
	type = ActionTypes.SELECT_RESULT;

	constructor(public payload: number) { }

}

export class UnSelectLightbox implements Action {
	type = ActionTypes.UNSELECT_RESULT;

	constructor(public payload: null) { }

}

export class FetchUserAction implements Action {
	type = ActionTypes.FETCH_USER;

	constructor(public payload: Query) { }
}

export class FetchUserSuccessAction implements Action {
	type = ActionTypes.FETCH_USER_SUCCESS;

	constructor(public payload: UserResponse) {}
}

export class FetchUserFailAction implements Action {
	type = ActionTypes.FETCH_USER_FAIL;

	constructor(public payload: any) {}
}


export class ShowUserFeed implements Action {
	type = ActionTypes.SHOW_USER_FEED;

	constructor(public payload: any) {}
}

export class ShowSearchResults implements Action {
	type = ActionTypes.SHOW_SEARCH_RESULTS;

	constructor(public payload: any) {}
}

export class ShowAllFeeds implements Action {
	type = ActionTypes.SHOW_ALL_FEEDS;

	constructor(public payload: any) {}
}

export class ShowImagesFeeds implements Action {
	type = ActionTypes.SHOW_IMAGES_FEEDS;

	constructor(public payload: any) {}
}

export class ShowVideosFeeds implements Action {
	type = ActionTypes.SHOW_VIDEOS_FEEDS;

	constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= SearchAction
	| SearchCompleteSuccessAction
	| SearchCompleteFailAction
	| SelectLightbox
	| UnSelectLightbox
	| FetchUserAction
	| FetchUserSuccessAction
	| FetchUserFailAction
	| ShowUserFeed
	| ShowSearchResults
	| ShowAllFeeds
	| ShowImagesFeeds
	| ShowVideosFeeds;
