import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import * as mediaWallDirectUrlAction from '../actions/media-wall-direct-url';

import { generateDirectUrl } from '../models';


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
export class MediaWallDirectUrlEffects {

	@Effect()
	generateDirectUrl$: Observable<Action>
		= this.actions$
		.pipe(
			ofType(mediaWallDirectUrlAction.ActionTypes.WALL_GENERATE_DIRECT_URL),
			withLatestFrom(this.store$),
			map(([action, state]) => {
				return {
					query: state.mediaWallQuery.query,
					design: state.mediaWallDesign.design,
					hiddenFeedId: state.mediaWallResponse.response.hiddenFeedId,
					blockedUser: state.mediaWallResponse.response.blockedUser,
					profanityCheck: state.mediaWallResponse.response.profanityCheck,
					removeDuplicate: state.mediaWallResponse.response.removeDuplicate,
					wallHeader: state.mediaWallCustom.wallHeader,
					wallCard: state.mediaWallCustom.wallCard,
					wallBackground: state.mediaWallCustom.wallBackground
				};
			}),
			map(queryObject => {
				const configSet = {
					query: queryObject.query.displayString,
					imageFilter: queryObject.query.filter.image,
					location: queryObject.query.location,
					displayHeader: queryObject.design.displayHeader,
					columnCount: queryObject.design.columnCount,
					count: queryObject.design.count,
					cardStyle: queryObject.design.cardStyle,
					headerTitle: queryObject.design.headerTitle,
					hiddenFeedId: queryObject.hiddenFeedId,
					blockedUser: queryObject.blockedUser,
					profanityCheck: queryObject.profanityCheck,
					removeDuplicate: queryObject.removeDuplicate,
					wallHeaderBackgroundColor: queryObject.wallHeader.backgroundColor,
					wallHeaderFontColor: queryObject.wallHeader.fontColor,
					wallCardFontColor: queryObject.wallCard.fontColor,
					wallCardAccentColor: queryObject.wallCard.accentColor,
					wallCardBackgroundColor: queryObject.wallCard.backgroundColor,
					wallBackgroundColor: queryObject.wallBackground.backgroundColor
				};
				const directUrl = generateDirectUrl(configSet);
				this.location.go(`/wall?${directUrl}`);
				return new mediaWallDirectUrlAction.WallShortenDirectUrlAction(directUrl);
			})
		);

	constructor(
		private actions$: Actions,
		private store$: Store<fromRoot.State>,
		private location: Location
	) { }

}
