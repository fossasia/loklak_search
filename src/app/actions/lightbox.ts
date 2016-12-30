import { Action } from '@ngrx/store';
import { actionTypeCheck } from '../utils';
import { ApiResponseResult } from '../models/api-response';

export const ActionTypes = {
	UPDATE_TWEET: actionTypeCheck('[TWEET] Tweet Updated')
};

export class UpdateTweet implements Action {
	type = ActionTypes.UPDATE_TWEET;

	constructor (public payload: ApiResponseResult) { }
}

export type Actions
	= UpdateTweet;
