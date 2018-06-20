import { Action } from '@ngrx/store';
import { SuggestResponse } from '../models/api-suggest';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	SUGGEST_QUERY: '[Suggest] Suggest',
	SUGGEST_COMPLETE_SUCCESS: '[Suggest] Suggest Complete Success',
	SUGGEST_COMPLETE_FAIL: '[Suggest] Suggest Complete Fail'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class SuggestAction implements Action {
	type = ActionTypes.SUGGEST_QUERY;

	constructor(public payload: string) { }
}

export class SuggestCompleteSuccessAction implements Action {
	type = ActionTypes.SUGGEST_COMPLETE_SUCCESS;

	constructor(public payload: SuggestResponse) { }
}

export class SuggestCompleteFailAction implements Action {
	type = ActionTypes.SUGGEST_COMPLETE_FAIL;

	constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= SuggestAction
	| SuggestCompleteSuccessAction
	| SuggestCompleteFailAction;
