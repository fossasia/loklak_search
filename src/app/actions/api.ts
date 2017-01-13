import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';
import { Query } from '../models/query';
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
	UNSELECT_RESULT: actionTypeCheck('[Api Unselect Lightbox')
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

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= SearchAction
	| SearchCompleteSuccessAction
	| SearchCompleteFailAction
	| SelectLightbox
	| UnSelectLightbox;
