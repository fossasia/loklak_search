import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as fromRoot from '../reducers';
import * as titleAction from '../actions/title';

@Injectable()
export class SetTitleEffects {

	@Effect({ dispatch: false })
	resetTitle$: Observable<void>
		= this.actions$
					.ofType(titleAction.ActionTypes.SET_TITLE)
					.withLatestFrom(this.store$)
					.map(([action, state]) => {
						const title = state.title.title;
						this.titleService.setTitle(title);
					});

	constructor(
		private store$: Store<fromRoot.State>,
		private actions$: Actions,
		private titleService: Title
	) { }

}
