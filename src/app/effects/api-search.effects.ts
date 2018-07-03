import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
	catchError,
	map,
	switchMap,
	withLatestFrom,
	takeUntil,
	debounceTime,
	skip
} from 'rxjs/operators';

import { SearchService, SearchServiceConfig, PushService } from '../services';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';
import * as queryAction from '../actions/query';
import * as trendsAction from '../actions/trends';
import * as wallAction from '../actions/media-wall';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import { parseDateToApiAcceptedFormat } from '../utils';

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
	search$: Observable<Action> = this.actions$
		.pipe(
			ofType(apiAction.ActionTypes.SEARCH),
			debounceTime(400),
			map((action: apiAction.SearchAction) => action.payload),
			switchMap(query => {
				const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();
				const nextSearch$ = this.actions$
					.pipe(
						ofType(apiAction.ActionTypes.SEARCH),
						skip(1)
					);

				if (query.filter.image) {
					searchServiceConfig.addFilters(['image']);
				} else {
					searchServiceConfig.removeFilters(['image']);
				}
				if (query.filter.video) {
					searchServiceConfig.addFilters(['video']);
				} else {
					searchServiceConfig.removeFilters(['video']);
				}

				return this.apiSearchService
					.fetchQuery(query.queryString, searchServiceConfig)
					.pipe(
						takeUntil(nextSearch$),
						map(response => new apiAction.SearchCompleteSuccessAction(response)),
						catchError(() => of(new apiAction.SearchCompleteFailAction('')))
					);
			})
		);

	@Effect()
	trendingHashtagsSearch$: Observable<Action> = this.actions$
		.pipe(
			ofType(trendsAction.ActionTypes.SEARCH_TRENDING_HASHTAGS),
			debounceTime(400),
			map((action: trendsAction.SearchTrendingHashtagsAction) => action.payload),
			switchMap(_ => {
				const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();
				const nextRequest$ = this.actions$
					.pipe(
						ofType(trendsAction.ActionTypes.SEARCH_TRENDING_HASHTAGS),
						skip(1)
					);

				searchServiceConfig.addAggregationFields(['hashtags']);
				searchServiceConfig.count = 0;
				searchServiceConfig.maximumRecords = 0;
				searchServiceConfig.source = 'cache';

				const todayDate = new Date().toDateString();
				const query = `since:${parseDateToApiAcceptedFormat(new Date(todayDate))}`;

				return this.apiSearchService
					.fetchQuery(query, searchServiceConfig)
					.pipe(
						takeUntil(nextRequest$),
						map(response => new apiAction.SearchTrendingHashtagsSuccessAction(response)),
						catchError(() => of(new apiAction.SearchTrendingHashtagsFailAction()))
					);
			})
		);

	@Effect()
	relocateAfterSearchSuccess$: Observable<Action>
		= this.actions$
			.pipe(
				ofType(
					apiAction.ActionTypes.SEARCH_COMPLETE_SUCCESS,
					apiAction.ActionTypes.SEARCH_COMPLETE_FAIL
				),
				withLatestFrom(this.store$),
				map(([action, state]) => {
					this.pushService.postData(action['payload']);
					return {
						doRelocate: state.query.relocateAfter,
						relocateTo: state.query.routerString
					};
				}),
				map(relocateObject => {
					if (relocateObject.doRelocate) {
						const URIquery = encodeURIComponent(relocateObject.relocateTo);

						if (!this.location.isCurrentPathEqualTo(`/search?query=${URIquery}`)) {
							this.location.go(`/search?query=${URIquery}`);
						}
					}
					return new queryAction.RelocationAfterQueryResetAction();
				})
			);

	@Effect()
	wallSearchAction$: Observable<Action> = this.actions$
		.pipe(
			ofType(wallAction.ActionTypes.WALL_SEARCH),
			debounceTime(400),
			map((action: wallAction.WallSearchAction) => action.payload),
			withLatestFrom(this.store$),
			map(([action, state]) => {
				return {
					directUrl: state.mediaWallDirectUrl.directUrl,
					query: state.mediaWallQuery.query
				};
			}),
			switchMap(queryObject => {
				const nextSearch$ = this.actions$
					.pipe(
						ofType(wallAction.ActionTypes.WALL_SEARCH),
						skip(1)
					);
				const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();

				if (queryObject.query.filter.image) {
					searchServiceConfig.addFilters(['image']);
				} else {
					searchServiceConfig.removeFilters(['image']);
				}
				if (queryObject.query.filter.video) {
					searchServiceConfig.addFilters(['video']);
				} else {
					searchServiceConfig.removeFilters(['video']);
				}

				searchServiceConfig.source = 'twitter';

					return this.apiSearchService
						.fetchQuery(queryObject.query.queryString, searchServiceConfig)
						.pipe(
							takeUntil(nextSearch$),
							map(response => {
								const URIquery = encodeURIComponent(queryObject.query.routerString);
								this.location.go(`/wall?${queryObject.directUrl}`);
								return new apiAction.WallSearchCompleteSuccessAction(response);
							}),
							catchError(() => of(new apiAction.WallSearchCompleteFailAction('')))
						);
			})
		);

	@Effect()
	nextWallSearchAction$: Observable<Action> = this.actions$
		.pipe(
			ofType(apiAction.ActionTypes.WALL_SEARCH_COMPLETE_SUCCESS),
			debounceTime(10000),
			withLatestFrom(this.store$),
			map(([action, state]) => {
					return new wallPaginationAction.WallNextPageAction('');
			})
		);

	@Effect()
	nextWallSearchActionAfterFail$: Observable<Action> = this.actions$
		.pipe(
			ofType(apiAction.ActionTypes.WALL_SEARCH_COMPLETE_FAIL),
				debounceTime(5000),
				withLatestFrom(this.store$),
				map(([action, state]) => {
						return new wallPaginationAction.WallNextPageAction('');
				})
		);

	constructor(
		private store$: Store<fromRoot.State>,
		private actions$: Actions,
		private apiSearchService: SearchService,
		private pushService: PushService,
		private location: Location
	) { }

}
