import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as titleAction from '../actions/title';
// import * as fromRoot from '../reducers';
// import { Store } from '@ngrx/store';

@Injectable()
export class SetTitleEffects {

	@Effect({ dispatch: false })
	resetTitle$: Observable<void> = this.actions$
		.pipe(
			ofType(
				titleAction.ActionTypes.SET_TITLE
			),
			map((action) => {
				const title = action['payload'];
				this.titleService.setTitle(title);
			})
		);

	constructor(
		private actions$: Actions,
		private titleService: Title
	) { }

}
