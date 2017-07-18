import { Action } from '@ngrx/store';
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
	WALL_NEXT_PAGE: '[Pagination] Wall Next Page',
	STOP_WALL_PAGINATION: '[Pagination] Wall Stop Pagination',
	WALL_PAGINATION_COMPLETE_SUCCESS: '[Pagination] Wall Pagination Complete Success',
	WALL_PAGINATION_COMPLETE_FAIL: '[Pagination] Wall Pagination Complete Fail'
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class WallNextPageAction implements Action {
	type = ActionTypes.WALL_NEXT_PAGE;

	constructor (public payload: any) { }
}

export class StopWallPaginationAction implements Action {
	type = ActionTypes.STOP_WALL_PAGINATION;

	constructor (public payload: any) { }
}

export class WallPaginationCompleteSuccessAction implements Action {
	type = ActionTypes.WALL_PAGINATION_COMPLETE_SUCCESS;

	constructor(public payload: ApiResponse) { }
}

export class WallPaginationCompleteFailAction implements Action {
	type = ActionTypes.WALL_PAGINATION_COMPLETE_FAIL;

	constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= WallNextPageAction
	| WallPaginationCompleteSuccessAction
	| WallPaginationCompleteFailAction;
