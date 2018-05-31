import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

import { UserService } from '../services';
import * as userApiAction from '../actions/user-api';
import { Query } from '../models';
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
	search$: Observable<Action>
		= this.actions$
					.ofType(userApiAction.ActionTypes.USER_SEARCH)
					.debounceTime(400)
					.map((action: userApiAction.UserSearchAction) => action.payload)
					.switchMap(query => {
						const nextSearch$ = this.actions$.ofType(userApiAction.ActionTypes.USER_SEARCH).skip(1);
						return this.apiUserService.fetchQuery(query.screen_name)
												.takeUntil(nextSearch$)
												.map(response => new userApiAction.UserSearchCompleteSuccessAction(response))
												.catch(() => of(new userApiAction.UserSearchCompleteFailAction('')));
					});

	constructor(
		private actions$: Actions,
		private apiUserService: UserService
	) { }
}
