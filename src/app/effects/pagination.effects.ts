import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchService } from '../services';
import { Query } from '../models';
import * as apiAction from '../actions/api';
import * as paginationAction from '../actions/pagination';
import * as fromRoot from '../reducers';

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
export class PaginationEffects {
	private query: Query;
	private page: number;
	private lastRecord: number;

	@Effect()
	pagination$: Observable<Action>
		= this.actions$
					.ofType(paginationAction.ActionTypes.NEXT_PAGE)
					.map((action: paginationAction.NextPageAction) => action.payload)
					.withLatestFrom(this.store, (action, state) => {
						this.query = state.query;
						this.page = state.pagination.page;
						this.lastRecord = state.apiResponse.entities.length;
					})
					.switchMap(() => {
						const nextSearch$ = this.actions$.ofType(apiAction.ActionTypes.SEARCH);

						return this.apiSearchService.fetchQuery(this.query.queryString, this.lastRecord)
												.takeUntil(nextSearch$)
												.map(response => {
													return new paginationAction.PaginationCompleteSuccessAction(response);
												})
												.catch(() => of(new paginationAction.PaginationCompleteFailAction('')));
					});

	constructor(
		private actions$: Actions,
		private apiSearchService: SearchService,
		private store: Store<fromRoot.State>
	) { }
}
