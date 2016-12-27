import { Action } from '@ngrx/store';
import { actionTypeCheck } from '../utils';
import { ApiResponse } from '../models/api-response';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	NEXT_PAGE: actionTypeCheck('[Pagination] Next Page'),
	PAGINATION_COMPLETE_SUCCESS: actionTypeCheck('[Pagination] Pagination Complete Success'),
	PAGINATION_COMPLETE_FAIL: actionTypeCheck('[Pagination] Pagination Complete Fail')
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class NextPageAction implements Action {
	type = ActionTypes.NEXT_PAGE;

	constructor (public payload: any) { }
}

export class PaginationCompleteSuccessAction implements Action {
	type = ActionTypes.PAGINATION_COMPLETE_SUCCESS;

	constructor(public payload: ApiResponse) { }
}

export class PaginationCompleteFailAction implements Action {
	type = ActionTypes.PAGINATION_COMPLETE_FAIL;

	constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= NextPageAction
	| PaginationCompleteSuccessAction
	| PaginationCompleteFailAction;
