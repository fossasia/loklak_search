import { ApiResponseResult } from './../../models/api-response';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as newsAction from '../../actions/news';

@Component({
	selector: 'app-feed-news',
	templateUrl: './feed-news.component.html',
	styleUrls: ['./feed-news.component.scss']
})

export class FeedNewsComponent implements OnInit, OnDestroy {
	public newsResponse: ApiResponseResult[] = [];
	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.store.select(fromRoot.getNewsResponse).subscribe(v => {
			for ( let i = 0; i < v.length; i++ ) {
				this.newsResponse.push(v[i]);
			}
		});
	}

	ngOnDestroy() {
		this.store.dispatch(new newsAction.NewsStatusAction(false));
	}

}
