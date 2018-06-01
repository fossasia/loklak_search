import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil, withLatestFrom, debounceTime } from 'rxjs/operators';

import { SearchService, SearchServiceConfig } from '../services';
import { Query } from '../models';
import * as wallAction from '../actions/media-wall';
import * as wallPaginationAction from '../actions/media-wall-pagination';
import * as fromRoot from '../reducers';
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
export class WallPaginationEffects {
	private searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();

	@Effect()
	wallPagination$: Observable<Action> = this.actions$
		.pipe(
			ofType(wallPaginationAction.ActionTypes.WALL_NEXT_PAGE),
			map((action: wallPaginationAction.WallNextPageAction) => action.payload),
			withLatestFrom(this.store$),
			map(([action, state]) => {
				return {
					query: state.mediaWallQuery.query,
					count: state.mediaWallDesign.design.count
				};
			}),
			switchMap(queryObject => {
				const nextSearch$ = this.actions$.ofType(wallAction.ActionTypes.WALL_SEARCH);

				if (queryObject.query.filter.image) {
					this.searchServiceConfig.addFilters(['image']);
				} else {
					this.searchServiceConfig.removeFilters(['image']);
				}
				if (queryObject.query.filter.video) {
					this.searchServiceConfig.addFilters(['video']);
				} else {
					this.searchServiceConfig.removeFilters(['video']);
				}
				this.searchServiceConfig.source = 'twitter';
				this.searchServiceConfig.count = queryObject.count;
				this.searchServiceConfig.maximumRecords = queryObject.count;

				return this.apiSearchService
					.fetchQuery(queryObject.query.queryString, this.searchServiceConfig)
					.pipe(
						takeUntil(nextSearch$),
						map(response => {
							return new wallPaginationAction.WallPaginationCompleteSuccessAction(response);
						}),
						catchError(() => of(new wallPaginationAction.WallPaginationCompleteFailAction('')))
					);
			})
		);

	@Effect()
	nextWallSearchAction$ = this.actions$
		.pipe(
			ofType(wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_SUCCESS),
			debounceTime(10000),
			withLatestFrom(this.store$),
			map(([action, state]) => {
				return new wallPaginationAction.WallNextPageAction('');
			})
		);

	@Effect()
		nextWallSearchActionAfterFail$ = this.actions$
			.pipe(
				ofType(wallPaginationAction.ActionTypes.WALL_PAGINATION_COMPLETE_FAIL),
				debounceTime(5000),
				withLatestFrom(this.store$),
				map(([action, state]) => {
					return new wallPaginationAction.WallNextPageAction('');
				})
			);

	constructor(
		private actions$: Actions,
		private apiSearchService: SearchService,
		private store$: Store<fromRoot.State>
	) { }
}
