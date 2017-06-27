import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/withLatestFrom';

import { SearchService, SearchServiceConfig } from '../services';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';
import * as queryAction from '../actions/query';
import { ApiResponse } from '../models';

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
export class ApiSearchEffects {
	private searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();

	@Effect()
	search$: Observable<Action>
		= this.actions$
					.ofType(apiAction.ActionTypes.SEARCH)
					.debounceTime(400)
					.map((action: apiAction.SearchAction) => action.payload)
					.switchMap(query => {
						const nextSearch$ = this.actions$.ofType(apiAction.ActionTypes.SEARCH).skip(1);

						this.searchServiceConfig.addAggregationFields(['created_at', 'screen_name', 'mentions', 'hashtags']);
						if (query.filter.image) {
							this.searchServiceConfig.addFilters(['image']);
						} else {
							this.searchServiceConfig.removeFilters(['image']);
						}
						if (query.filter.video) {
							this.searchServiceConfig.addFilters(['video']);
						} else {
							this.searchServiceConfig.removeFilters(['video']);
						}

						return this.apiSearchService.fetchQuery(query.queryString, this.searchServiceConfig)
												.takeUntil(nextSearch$)
												.map(response => {
													return new apiAction.SearchCompleteSuccessAction(response);
												})
												.catch(() => of(new apiAction.SearchCompleteFailAction('')));
					});

	@Effect()
	searchCompleteSuccess$: Observable<Action>
		= this.actions$
					.ofType(apiAction.ActionTypes.SEARCH_COMPLETE_SUCCESS)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
						return {
							doRelocate: state.query.relocateAfter,
							queryString: state.query.queryString
						};
					})
					.map(relocateObject => {
						if (relocateObject.doRelocate) {
							const URIquery = encodeURIComponent(relocateObject.queryString);
							this.location.go(`/search?query=${URIquery}`);
						}
						return new queryAction.RelocationAfterQueryResetAction();
					});


	constructor(
		private store$: Store<fromRoot.State>,
		private actions$: Actions,
		private apiSearchService: SearchService,
		private location: Location
	) { }

}
