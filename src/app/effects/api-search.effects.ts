import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
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
import * as trendsAction from '../actions/trends';
import * as wallAction from '../actions/media-wall';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import { ApiResponse } from '../models';
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
	search$: Observable<Action>
		= this.actions$
					.ofType(apiAction.ActionTypes.SEARCH)
					.debounceTime(400)
					.map((action: apiAction.SearchAction) => action.payload)
					.switchMap(query => {
						const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();
						const nextSearch$ = this.actions$.ofType(apiAction.ActionTypes.SEARCH).skip(1);

						searchServiceConfig.addAggregationFields(['created_at', 'screen_name', 'mentions', 'hashtags']);
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

						return this.apiSearchService.fetchQuery(query.queryString, searchServiceConfig)
												.takeUntil(nextSearch$)
												.map(response => new apiAction.SearchCompleteSuccessAction(response))
												.catch(() => of(new apiAction.SearchCompleteFailAction('')));
					});

	@Effect()
	trendingHashtagsSearch$: Observable<Action>
		= this.actions$
					.ofType(trendsAction.ActionTypes.SEARCH_TRENDING_HASHTAGS)
					.debounceTime(400)
					.map((action: trendsAction.SearchTrendingHashtagsAction) => action.payload)
					.switchMap(_ => {
						const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();
						const nextRequest$ = this.actions$.ofType(trendsAction.ActionTypes.SEARCH_TRENDING_HASHTAGS).skip(1);

						searchServiceConfig.addAggregationFields(['hashtags']);
						searchServiceConfig.count = 0;
						searchServiceConfig.maximumRecords = 0;
						searchServiceConfig.source = 'cache';

						const todayDate = new Date().toDateString();
						const query = `since:${parseDateToApiAcceptedFormat(new Date(todayDate))}`;

						return this.apiSearchService.fetchQuery(query, searchServiceConfig)
												.takeUntil(nextRequest$)
												.map(response => new apiAction.SearchTrendingHashtagsSuccessAction(response))
												.catch(() => of(new apiAction.SearchTrendingHashtagsFailAction()));
					});

	@Effect()
	relocateAfterSearchSuccess$: Observable<Action>
		= this.actions$
					.ofType(apiAction.ActionTypes.SEARCH_COMPLETE_SUCCESS,
									apiAction.ActionTypes.SEARCH_COMPLETE_FAIL)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
						return {
							doRelocate: state.query.relocateAfter,
							relocateTo: state.query.routerString
						};
					})
					.map(relocateObject => {
						if (relocateObject.doRelocate) {
							const URIquery = encodeURIComponent(relocateObject.relocateTo);

							if (!this.location.isCurrentPathEqualTo(`/search?query=${URIquery}`)) {
								this.location.go(`/search?query=${URIquery}`);
							}
						}
						return new queryAction.RelocationAfterQueryResetAction();
					});

	@Effect({ dispatch: false })
	resetTitleAfterSearchSuccess$: Observable<void>
		= this.actions$
					.ofType(apiAction.ActionTypes.SEARCH_COMPLETE_SUCCESS,
									apiAction.ActionTypes.SEARCH_COMPLETE_FAIL)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
						const displayString = state.query.displayString;
						let title = `${displayString} - Loklak Search`;
						if (action.type === apiAction.ActionTypes.SEARCH_COMPLETE_FAIL) {
							title += ' - No Results';
						}
						this.titleService.setTitle(title);
					});

	@Effect()
	wallSearchAction$: Observable<Action>
		= this.actions$
					.ofType(wallAction.ActionTypes.WALL_SEARCH)
					.debounceTime(400)
					.map((action: wallAction.WallSearchAction) => action.payload)
					.switchMap(query => {
						const nextSearch$ = this.actions$.ofType(wallAction.ActionTypes.WALL_SEARCH).skip(1);
						const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();

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

							return this.apiSearchService.fetchQuery(query.queryString, searchServiceConfig)
												.takeUntil(nextSearch$)
												.map(response => {
													const URIquery = encodeURIComponent(query.queryString);
													this.location.go(`/wall?query=${URIquery}`);
													return new apiAction.WallSearchCompleteSuccessAction(response);
												})
												.catch(() => of(new apiAction.WallSearchCompleteFailAction('')));
					});

	@Effect()
	nextWallSearchAction$
		= this.actions$
					.ofType(apiAction.ActionTypes.WALL_SEARCH_COMPLETE_SUCCESS)
					.debounceTime(5000)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
								if (state.mediaWallResponse.lastResponseLength > 0) {
									return new wallPaginationAction.WallNextPageAction('');
								}
								else {
									return new wallPaginationAction.StopWallPaginationAction('');
								}
					});

	@Effect({ dispatch: false })
	resetTitleAfterWallSearchSuccess$: Observable<void>
		= this.actions$
					.ofType(apiAction.ActionTypes.WALL_SEARCH_COMPLETE_SUCCESS,
									apiAction.ActionTypes.WALL_SEARCH_COMPLETE_FAIL)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
						const displayString = state.mediaWallQuery.query.displayString;
						let title = `${displayString} - Loklak Media Wall`;
						if (action.type === apiAction.ActionTypes.WALL_SEARCH_COMPLETE_FAIL) {
							title += ' - No Results';
						}
						this.titleService.setTitle(title);
					});


	constructor(
		private store$: Store<fromRoot.State>,
		private actions$: Actions,
		private apiSearchService: SearchService,
		private location: Location,
		private titleService: Title
	) { }

}
