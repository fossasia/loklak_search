import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';

export const ActionTypes = {
	NEW_COLOR_ACCENT: '[Media Wall] Accent Color',
	NEW_COLOR_TEXT: '[Media Wall] Text Color',
	NEW_COLOR_BACKGROUND: '[Media Wall] Background Color',
	WALL_INPUT_VALUE_CHANGE: '[Media Wall] Query Change'
};

export class NewAccentColorAction implements Action {
	type = ActionTypes.NEW_COLOR_ACCENT;

	constructor(public payload: string) { }
}

export class NewTextColorAction implements Action {
	type = ActionTypes.NEW_COLOR_TEXT;

	constructor(public payload: string) { }
}

export class NewBackgroundColorAction implements Action {
	type = ActionTypes.NEW_COLOR_BACKGROUND;

	constructor(public payload: string) { }
}

export class WallInputValueChangeAction implements Action {
	type = ActionTypes.WALL_INPUT_VALUE_CHANGE;

	constructor(public payload: string) { }
}


export type Actions
= NewAccentColorAction
| NewTextColorAction
| NewBackgroundColorAction
| WallInputValueChangeAction;
