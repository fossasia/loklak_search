import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'actionTypeCheck' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
	WALL_HIDE_FEED: '[Media Wall] Media Wall Hide Feed',
	WALL_SHOW_FEED: '[Media Wall] Media Wall Show Feed',
	WALL_BLOCK_USER: '[Media Wall] Media Wall Block User',
	WALL_UNBLOCK_USER: '[Media Wall] Media Wall Unblock User',
	WALL_PROFANITY_CHANGE_ACTION: '[Media Wall] Media Wall Profanity Filter',
	WALL_REMOVE_DUPLICATE_CHANGE_ACTION: '[Media Wall] Media Wall Remove Duplicate'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class WallHideFeedAction implements Action {
	type = ActionTypes.WALL_HIDE_FEED;

	constructor(public payload: string) { }
}

export class WallBlockUserAction implements Action {
	type = ActionTypes.WALL_BLOCK_USER;

	constructor(public payload: string) { }
}

export class WallShowFeedAction implements Action {
	type = ActionTypes.WALL_SHOW_FEED;

	constructor(public payload: string) { }
}

export class WallUnBlockUserAction implements Action {
	type = ActionTypes.WALL_UNBLOCK_USER;

	constructor(public payload: string) { }
}

export class WallProfanityChangeAction implements Action {
	type = ActionTypes.WALL_PROFANITY_CHANGE_ACTION;

	constructor(public payload: boolean) { }
}

export class WallRemoveDuplicateChangeAction implements Action {
	type = ActionTypes.WALL_REMOVE_DUPLICATE_CHANGE_ACTION;

	constructor(public payload: boolean) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
	= WallHideFeedAction
	| WallBlockUserAction
	| WallShowFeedAction
	| WallUnBlockUserAction;
