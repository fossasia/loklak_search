import { Action } from '@ngrx/store';
import { ApiResponse } from '../models/api-response';
import { Query, FilterList, TimeBound } from '../models';

export const ActionTypes = {
	WALL_VALUE_CHANGE: '[Media Wall Query] Wall Query Value Change',
	WALL_QUERY_CHANGE: '[Media Wall Query] Wall Query Change'
};

export class WallInputValueChangeAction implements Action {
	type = ActionTypes.WALL_VALUE_CHANGE;

	constructor (public payload: string) { }
}

export class WallQueryChangeAction implements Action {
	type = ActionTypes.WALL_QUERY_CHANGE;

	constructor(public payload?: Query) { }
}

export type Actions
= WallInputValueChangeAction
	| WallQueryChangeAction;
