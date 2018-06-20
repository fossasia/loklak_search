import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, empty } from 'rxjs';
import { catchError, map, switchMap, takeUntil, debounceTime, skip } from 'rxjs/operators';

import { SuggestService } from '../services';
import * as suggestAction from '../actions/suggest';

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
export class SuggestEffects {

	@Effect()
	suggest$: Observable<Action> = this.actions$
		.pipe(
			ofType(suggestAction.ActionTypes.SUGGEST_QUERY),
			debounceTime(300),
			map((action: suggestAction.SuggestAction) => action.payload),
			switchMap(query => {
				const nextSuggest$ = this.actions$
					.pipe(
						ofType(suggestAction.ActionTypes.SUGGEST_QUERY),
						skip(1)
					);

				return this.suggestService.fetchQuery(query)
					.pipe(
						takeUntil(nextSuggest$),
						map(response => {
							return new suggestAction.SuggestCompleteSuccessAction(response);
						}),
						catchError(() => of(new suggestAction.SuggestCompleteFailAction('')))
					);
			})
		);

	constructor(
		private actions$: Actions,
		private suggestService: SuggestService,
	) { }

}
