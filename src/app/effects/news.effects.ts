import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as newsAction from '../actions/news';
import * as newsStatusAction from '../actions/newsSuccess';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { newsOrgs } from '../shared/news-org';
import { SearchService, SearchServiceConfig } from '../services';

@Injectable()
export class DisplayNewsEffects {

	@Effect({ dispatch: false })
	searchNews$: Observable<void> = this.actions$
		.pipe(
			ofType(
				newsAction.ActionTypes.NEWS_STATUS
			),
			map((action) => {
				if (action['payload']) {
					const orgs = newsOrgs;
					orgs.forEach((org) => {
						const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();
						this.apiSearchService
							.fetchQuery('from:' + org, searchServiceConfig).subscribe(response =>
								this.store$.dispatch(new newsStatusAction.NewsSearchSuccessAction(response)));
					});
				}
			})
		);

	constructor(
		private actions$: Actions,
		private apiSearchService: SearchService,
		private store$: Store<fromRoot.State>
	) { }

}
