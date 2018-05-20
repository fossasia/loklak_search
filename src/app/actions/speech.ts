import { Action } from '@ngrx/store';

export const ActionTypes = {
	MODE_CHANGE: '[Speech] Change',
};

export class SearchAction implements Action {
	type = ActionTypes.MODE_CHANGE;

	constructor(public payload: any) {}
}

export type Actions
	= SearchAction;
