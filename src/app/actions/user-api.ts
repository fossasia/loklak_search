import { Action } from '@ngrx/store';
import { UserQuery, UserApiResponse, UserResponse } from '../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	USER_SEARCH: '[User Api] User Search',
	USER_SEARCH_COMPLETE_SUCCESS: '[User Api] User Search Complete Success',
	USER_SEARCH_COMPLETE_FAIL: '[User Api] User Search Complete Fail',
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class UserSearchAction implements Action {
	type = ActionTypes.USER_SEARCH;

	constructor(public payload: UserQuery) {  }
}

export class UserSearchCompleteSuccessAction implements Action {
	type = ActionTypes.USER_SEARCH_COMPLETE_SUCCESS;

	constructor(public payload: UserResponse) { }
}

export class UserSearchCompleteFailAction implements Action {
	type = ActionTypes.USER_SEARCH_COMPLETE_FAIL;

	constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= UserSearchAction
	| UserSearchCompleteSuccessAction
	| UserSearchCompleteFailAction;
