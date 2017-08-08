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
	WALL_CARD_PROPERTIES_CHANGE: '[Media Wall] Media Wall Card Properties Change',
	WALL_LIGHT_THEME_CHANGE: '[Media Wall] Media Wall Basic Theme',
	WALL_DARK_THEME_CHANGE: '[Media Wall] Media Wall Dark Theme',
	WALL_CLASSIC_THEME_CHANGE: '[Media Wall] Media Wall Classic Theme',
	WALL_COOL_BLUES_THEME_CHANGE: '[Media Wall] Media Wall Cool Blues Theme'
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

	constructor(public payload: WallHeader) { }
}

export class WallBackgroundPropertiesChangeAction implements Action {
	type = ActionTypes.WALL_BACKGROUND_PROPERTIES_CHANGE;

	constructor(public payload: WallBackground) { }
}

export class WallCardPropertiesChangeAction implements Action {
	type = ActionTypes.WALL_CARD_PROPERTIES_CHANGE;

	constructor(public payload: WallCard) { }
}

export class WallLightThemeChangeAction implements Action {
	type = ActionTypes.WALL_LIGHT_THEME_CHANGE;

	constructor(public payload: '') { }
}

export class WallClassicThemeChangeAction implements Action {
	type = ActionTypes.WALL_CLASSIC_THEME_CHANGE;

	constructor(public payload: '') { }
}

export class WallDarkThemeChangeAction implements Action {
	type = ActionTypes.WALL_DARK_THEME_CHANGE;

	constructor(public payload: '') { }
}

export class WallCoolBluesThemeChangeAction implements Action {
	type = ActionTypes.WALL_COOL_BLUES_THEME_CHANGE;

	constructor(public payload: '') { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= WallBackgroundPropertiesChangeAction
	| WallCardPropertiesChangeAction
	| WallHeaderPropertiesChangeAction
	| WallClassicThemeChangeAction
	| WallLightThemeChangeAction
	| WallCoolBluesThemeChangeAction
	| WallDarkThemeChangeAction;
