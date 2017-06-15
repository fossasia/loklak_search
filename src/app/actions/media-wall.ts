import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';

export const ActionTypes = {
	WALL_INPUT_VALUE_CHANGE: '[Media Wall] Query Change'
};


export class WallInputValueChangeAction implements Action {
	type = ActionTypes.WALL_INPUT_VALUE_CHANGE;

	constructor(public payload: string) { }
}


export type Actions
= WallInputValueChangeAction;
