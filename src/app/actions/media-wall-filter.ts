import { Action } from '@ngrx/store';

export const ActionTypes = {
	WALL_PROFANITY_CHECK: '[Media Wall] Profanity Check',
	WALL_ACCOUNT_EXCLUSION: '[Media Wall] Account Exclusion'
};


export class WallProfanityFilterAction implements Action {
	type = ActionTypes.WALL_PROFANITY_CHECK;

	constructor(public payload: boolean) { }
}

export class WallAccountExclusionFilterAction implements Action {
	type = ActionTypes.WALL_ACCOUNT_EXCLUSION;

	constructor(public payload: string) { }
}

export type Actions
= WallProfanityFilterAction
| WallAccountExclusionFilterAction;
