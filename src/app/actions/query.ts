import { Action } from '@ngrx/store';
import { Query, FilterList, TimeBound } from '../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	VALUE_CHANGE: '[Query] Value Change',
	FILTER_CHANGE: '[Query] Filter Change',
	LOCATION_CHANGE: '[Query] Location Change',
	TIME_BOUND_CHANGE: '[Query] Time Bound Change',
	QUERY_CHANGE: '[Query] Query Change',
	RELOCATE_AFTER_QUERY_SET: '[Query] Relocate After Query Set',
	RELOCATE_AFTER_QUERY_RESET: '[Query] Relocate After Query Reset'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class InputValueChangeAction implements Action {
	type = ActionTypes.VALUE_CHANGE;

	constructor (public payload: string) { }
}

export class FilterChangeAction implements Action {
	type = ActionTypes.FILTER_CHANGE;

	constructor (public payload: FilterList) { }
}

export class LocationChangeAction implements Action {
	type = ActionTypes.LOCATION_CHANGE;

	constructor (public payload: string) { }
}

export class TimeBoundChangeAction implements Action {
	type = ActionTypes.TIME_BOUND_CHANGE;

	constructor (public payload: TimeBound) { }
}

export class QueryChangeAction implements Action {
	type = ActionTypes.QUERY_CHANGE;

	constructor(public payload?: Query) { }
}

export class RelocationAfterQuerySetAction implements Action {
	type = ActionTypes.RELOCATE_AFTER_QUERY_SET;

	constructor(public payload?: any) { }
}

export class RelocationAfterQueryResetAction implements Action {
	type = ActionTypes.RELOCATE_AFTER_QUERY_RESET;

	constructor(public payload?: any) { }
}

export type Actions
	= InputValueChangeAction
	| FilterChangeAction
	| LocationChangeAction
	| TimeBoundChangeAction
	| RelocationAfterQuerySetAction
	| RelocationAfterQueryResetAction;
