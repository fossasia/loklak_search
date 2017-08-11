import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as fromRoot from '../reducers';
import * as wallAction from '../actions/media-wall';
import * as mediaWallAction from '../actions/media-wall-query';

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
export class MediaWallQueryEffects {

	@Effect()
	inputChange$: Observable<Action>
		= this.actions$
					.ofType(mediaWallAction.ActionTypes.WALL_VALUE_CHANGE)
					.map(_ => new mediaWallAction.WallQueryChangeAction());

	@Effect()
	mediaWallQueryChange$: Observable<Action>
		= this.actions$
					.ofType(mediaWallAction.ActionTypes.WALL_QUERY_CHANGE)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
							return new wallAction.WallSearchAction(state.mediaWallQuery.query);
					});

	constructor(
		private actions$: Actions,
		private store$: Store<fromRoot.State>
	) { }

}
