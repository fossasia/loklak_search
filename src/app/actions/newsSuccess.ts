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
	NEWS_SEARCH_SUCCESS: '[NEWS] SEARCH SUCCESS'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class NewsSearchSuccessAction implements Action {
	type = ActionTypes.NEWS_SEARCH_SUCCESS;

	constructor (public payload: ApiResponse) { }
}

export type Actions
	= NewsSearchSuccessAction;
