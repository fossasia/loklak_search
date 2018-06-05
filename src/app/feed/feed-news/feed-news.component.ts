import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import { Query } from '../../models/query';
import * as searchAction from '../../actions/api';
import { ApiResponseResult } from '../../models/api-response';

@Component({
	selector: 'app-feed-news',
	templateUrl: './feed-news.component.html',
	styleUrls: ['./feed-news.component.scss']
})
export class FeedNewsComponent implements OnInit {

	public isSearching$: Observable<boolean>;
	public apiResponseResults$: Observable<ApiResponseResult[]>;
	searchQuery: Query = {
		displayString: 'from:CNN',
		queryString: 'from:CNN',
		routerString: 'from:CNN',
		filter: { video: false, image: false },
		location: null,
		timeBound: { since: null, until: null },
		from: true
	}
	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.queryFromURL();
		this.getDataFromStore();
	}

	private queryFromURL(): void {
		this.store.dispatch(new searchAction.SearchAction(this.searchQuery));
	}

	private getDataFromStore(): void {
		this.isSearching$ = this.store.select(fromRoot.getSearchLoading);
		this.apiResponseResults$ = this.store.select(fromRoot.getApiResponseEntities);
	}
}
