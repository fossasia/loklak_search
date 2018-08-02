import { ApiResponseResult } from './../../models/api-response';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as newsAction from '../../actions/news';
import { Query } from '../../models/query';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-feed-news',
	templateUrl: './feed-news.component.html',
	styleUrls: ['./feed-news.component.scss']
})

export class FeedNewsComponent implements OnInit, OnDestroy {
	public newsResponse: ApiResponseResult[] = [];
	public query: string;
	public query$: Observable<Query>;

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		const texts = [];
		this.store.select(fromRoot.getQuery).subscribe(res => this.query = res.displayString);
		this.query$ = this.store.select(fromRoot.getQuery);
		this.store.select(fromRoot.getNewsResponse).subscribe(v => {
			for ( let i = 0; i < v.length; i++ ) {
				if (v[i]['text'].includes(this.query.replace(/\s/g, '').toLowerCase())) {
					if (!texts.includes(v[i]['text'].replace(/\s/g, '').toLowerCase())) {
						texts.push(v[i]['text'].replace(/\s/g, '').toLowerCase());
						this.newsResponse.push(v[i]);
					}
				}
			}
		});
	}

	ngOnDestroy() {
		this.store.dispatch(new newsAction.NewsStatusAction(false));
		this.newsResponse = null;
	}
}
