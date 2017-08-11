import { Action } from '@ngrx/store';
import { WallHeader, WallBackground, WallCard } from '../models';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	WALL_DISPLAY_HEADER_ACTION: '[Media Wall] Media Wall Display Header',
	WALL_HEADER_TITLE_CHANGE: '[Media Wall] Media Wall Header Title Change',
	WALL_COLUMN_COUNT_CHANGE_ACTION: '[Media Wall] Media Wall Column Count Change',
	WALL_COUNT_CHANGE_ACTION: '[Media Wall] Media Wall Language Change',
	WALL_CARD_STYLE_CHANGE_ACTION: '[Media Wall] Media Wall Card Style Change'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class WallDisplayHeaderAction implements Action {
	type = ActionTypes.WALL_DISPLAY_HEADER_ACTION;

	constructor(public payload?: boolean) { }
}

export class WallHeaderTitleChangeAction implements Action {
	type = ActionTypes.WALL_HEADER_TITLE_CHANGE;

	constructor(public payload: string) { }
}

export class WallColumnCountChangeAction implements Action {
	type = ActionTypes.WALL_COLUMN_COUNT_CHANGE_ACTION;

	constructor(public payload?: string) { }
}

export class WallCountChangeAction implements Action {
	type = ActionTypes.WALL_COUNT_CHANGE_ACTION;

	constructor(public payload: string) { }
}

export class WallCardStyleChangeAction implements Action {
	type = ActionTypes.WALL_CARD_STYLE_CHANGE_ACTION;

	constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= WallDisplayHeaderAction
	| WallColumnCountChangeAction
	| WallHeaderTitleChangeAction
	| WallCardStyleChangeAction
	| WallCountChangeAction;
