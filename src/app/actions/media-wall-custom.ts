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
	WALL_HEADER_PROPERTIES_CHANGE: '[Media Wall] Media Wall Header Properties Change',
	WALL_BACKGROUND_PROPERTIES_CHANGE: '[Media Wall] Media Wall Background Properties Change',
	WALL_CARD_PROPERTIES_CHANGE: '[Media Wall] Media Wall Card Properties Change'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class WallHeaderPropertiesChangeAction implements Action {
	type = ActionTypes.WALL_HEADER_PROPERTIES_CHANGE;

	constructor(public payload: WallHeader) {  }
}

export class WallBackgroundPropertiesChangeAction implements Action {
	type = ActionTypes.WALL_BACKGROUND_PROPERTIES_CHANGE;

	constructor(public payload: WallBackground) { }
}

export class WallCardPropertiesChangeAction implements Action {
	type = ActionTypes.WALL_CARD_PROPERTIES_CHANGE;

	constructor(public payload: WallCard) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= WallBackgroundPropertiesChangeAction
	| WallCardPropertiesChangeAction
	| WallHeaderPropertiesChangeAction;
