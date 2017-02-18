import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
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

import { SearchService, AggregationService } from '../services';
import * as apiAction from '../actions/api';
import { Query, ReloactionAfterQuery } from '../models/query';
import { ApiResponse } from '../models/api-response';

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

	@Effect()
	search$: Observable<Action>
		= this.actions$
					.ofType(apiAction.ActionTypes.SEARCH)
					.debounceTime(200)
					.map((action: apiAction.SearchAction) => action.payload)
					.switchMap(query => {

						const nextSearch$ = this.actions$.ofType(apiAction.ActionTypes.SEARCH).skip(1);

						return Observable.forkJoin([this.apiSearchService.fetchQuery(query.queryString),this.apiAggregationService.fetchQuery(query.queryString)])
																				.takeUntil(nextSearch$)
																				.map((response : ApiResponse[]) => {
																					if (query.location === ReloactionAfterQuery.RELOCATE) {
																						let URIquery = encodeURIComponent(query.queryString);
																						this.location.go(`/search?query=${URIquery}`);
																					}
																					return new apiAction.SearchCompleteSuccessAction(this.setvalues(response));
																				})
																				.catch(() => of(new apiAction.SearchCompleteFailAction('')));
					});

	constructor(
		private actions$: Actions,
		private apiSearchService: SearchService,
		private apiAggregationService: AggregationService,
		private location: Location
	) { }

	private setvalues(val: ApiResponse[]): ApiResponse {
		let apiResponse : ApiResponse = val[0];
		let aggregationResponse : ApiResponse = val[1];
		apiResponse.aggregations = aggregationResponse.aggregations;
		return apiResponse;
	} 

}
