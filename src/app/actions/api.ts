import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';
import { Query } from '../models/query';
import { UserApiResponse } from '../models/api-user-response';
import { actionTypeCheck } from '../utils';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	SEARCH: actionTypeCheck('[Api] Search'),
	SEARCH_COMPLETE_SUCCESS: actionTypeCheck('[Api] Search Complete Success'),
	SEARCH_COMPLETE_FAIL: actionTypeCheck('[Api] Search Complete Fail'),
	SELECT_RESULT: actionTypeCheck('[Api] Select Lightbox'),
	UNSELECT_RESULT: actionTypeCheck('[Api Unselect Lightbox'),
	FETCH_USER: actionTypeCheck('[Api] Fetch User'),
	FETCH_USER_SUCCESS: actionTypeCheck('[Api] Fetch User Success'),
	FETCH_USER_FAIL: actionTypeCheck('[Api] Fetch User Fail'),
	FETCH_AGGREGATION: actionTypeCheck('[Api] Fetch Aggregation'),
	FETCH_AGGREGATION_SUCCESS: actionTypeCheck('[Api] Fetch Aggregation Success'),
	FETCH_AGGREGATION_FAIL: actionTypeCheck('[Api] Fetch Aggregation Fail')
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

	constructor(public payload: UserApiResponse) {}
}

export class FetchUserFailAction implements Action {
	type = ActionTypes.FETCH_USER_FAIL;

	constructor(public payload: any) {}
}

export class FetchAggregationAction implements Action {
	type = ActionTypes.FETCH_AGGREGATION;

	constructor(public payload: Query) { }
}

export class FetchAggregationSuccessAction implements Action {
	type = ActionTypes.FETCH_AGGREGATION_SUCCESS;

	constructor(public payload: ApiResponse) { }
}

export class FetchAggregationFailAction implements Action {
	type = ActionTypes.FETCH_AGGREGATION_FAIL;

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
	| FetchAggregationAction
	| FetchAggregationSuccessAction
	| FetchAggregationFailAction;
