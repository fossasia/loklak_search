import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as queryAction from '../../actions/query';
import * as searchAction from '../../actions/api';
import { ApiResponseResult } from '../../models/api-response';

export interface newsQuery {
	displayString: string;
	queryString: string;
	routerString: string;
	filter: { video: boolean, image: boolean };
	location: null;
	timeBound: { since: Date, until: Date };
	from: boolean;
}

@Component({
	selector: 'app-feed-news',
	templateUrl: './feed-news.component.html',
	styleUrls: ['./feed-news.component.scss']
})
export class FeedNewsComponent implements OnInit {

	public isSearching$: Observable<boolean>;
	public apiResponseResults$: Observable<ApiResponseResult[]>;
	public apiresponse: Array<ApiResponseResult[]> = [];
	public newsObservables: any[] = [];
	constructor(
		private store: Store<fromRoot.State>,
		private http: Http
	) { }

	ngOnInit() {
		this.store.dispatch(new queryAction.RelocationAfterQueryResetAction());
		this.newsOrgFromJson();
	}

	newsOrgFromJson() {
		this.http.get('assets/NewsOrg.json').map((res: Response) => res.json())
			.subscribe(res => {
				for(let i = 0; i < res["Org"].length; i++) {
					let extracted = 'from:' + res["Org"][i];
					let searchQuery: newsQuery = {
						displayString: '' + extracted,
						queryString: '' + extracted,
						routerString: '' + extracted,
						filter: { video: false, image: false },
						location: null,
						timeBound: { since: null, until: null },
						from: true
					}
					this.queryFromURL(searchQuery);
					this.getDataFromStore().subscribe(value => this.apiresponse.push(value));	
				}
		});
	}

	private queryFromURL(searchQuery: newsQuery): void {
		this.store.dispatch(new searchAction.SearchAction(searchQuery));
	}

	private getDataFromStore(): Observable<ApiResponseResult[]> {
		this.isSearching$ = this.store.select(fromRoot.getSearchLoading);
		this.apiResponseResults$ = this.store.select(fromRoot.getApiResponseEntities);
		return this.apiResponseResults$;
	}
}
