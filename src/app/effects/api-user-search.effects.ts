import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, debounceTime, takeUntil, skip, catchError } from 'rxjs/operators';

import { UserService } from '../services';
import * as userApiAction from '../actions/user-api';
/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * A simple way to think of it is that ngrx/effects is an event listener of sorts.
 * It listens for actions being dispatched to the store. You can then tell `ngrx/effects`
 * that when a particular action is dispatched, to take another, new action as a result.
 * At the end, what’s really happening is `ngrx/effects` is an `action generator` that dispatches
 * a `new action` as a result of a different action.
 */
@Injectable()
export class ApiUserSearchEffects {

	@Effect()
	search$: Observable<Action> = this.actions$
		.pipe(
			ofType(userApiAction.ActionTypes.USER_SEARCH),
			debounceTime(400),
			map((action: userApiAction.UserSearchAction) => action.payload),
			switchMap(query => {
				const nextSearch$ = this.actions$.pipe(
					ofType(userApiAction.ActionTypes.USER_SEARCH),
					skip(1)
				);

				const follow_count = 10;

				return this.apiUserService.fetchQuery(query.screen_name)
					.pipe(
						takeUntil(nextSearch$),
						map(response => new userApiAction.UserSearchCompleteSuccessAction(response)),
						catchError(() => of(new userApiAction.UserSearchCompleteFailAction('')))
					);
			})
		);

	constructor(
		private actions$: Actions,
		private apiUserService: UserService
	) { }
}
