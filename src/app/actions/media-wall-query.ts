import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';

export const ActionTypes = {
	WALL_QUERY_CHANGE: '[Media Wall] Query Change'
};


export class WallQueryChangeAction implements Action {
	type = ActionTypes.WALL_QUERY_CHANGE;

	constructor(public payload: string) { }
}


export type Actions
= WallQueryChangeAction;
