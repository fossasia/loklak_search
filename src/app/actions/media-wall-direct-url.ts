import { Action } from '@ngrx/store';

export const ActionTypes = {
	WALL_GENERATE_DIRECT_URL: '[Media Wall] Wall Generate Direct URL',
	WALL_SHORTEN_DIRECT_URL: '[Media Wall] Wall Shorten Direct URL'
};

export class WallGenerateDirectUrlAction implements Action {
	type = ActionTypes.WALL_GENERATE_DIRECT_URL;

	constructor (public payload?: any) { }
}

export class WallShortenDirectUrlAction implements Action {
	type = ActionTypes.WALL_SHORTEN_DIRECT_URL;

	constructor(public payload?: any) { }
}

export type Actions
= WallGenerateDirectUrlAction
	| WallShortenDirectUrlAction;
