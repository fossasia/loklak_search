import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as apiAction from '../../actions/api';
import { ApiResponseResult, ApiResponseAggregations } from '../../models/api-response';
import { Query, ReloactionAfterQuery } from '../../models/query';

@Component({
	selector: 'info-box',
	templateUrl: './info-box.component.html',
	styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
	private datetime: string = null;
	private data = this.store['source']['value']['apiResponse']['aggregations'];
	@Input() private topHashtags;
	@Input() private topMentions;
	@Input() private topTwitterers;
	constructor(
		private store: Store<fromRoot.State>
		) { }

	ngOnInit() {
		this.sortHashtags(this.data);
		this.sortTwiterers(this.data);
		this.sortMentions(this.data);
	}
	sortHashtags(statistics){
		let sortable = [];
            for (let s in statistics.hashtags) {
                sortable.push([s, statistics.hashtags[s]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            sortable = (sortable.slice(0, 10));
            this.topHashtags = sortable;
            return this.topHashtags;
	}
	sortTwiterers(statistics){
		let sortable = [];
            for (let s in statistics.screen_name) {
                sortable.push([s, statistics.screen_name[s]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            sortable = (sortable.slice(0, 10));
            this.topTwitterers = sortable;
            return this.topTwitterers;
	}
	sortMentions(statistics){
		let sortable = [];
            for (let s in statistics.mentions) {
                sortable.push([s, statistics.mentions[s]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            sortable = (sortable.slice(0, 10));
            this.topMentions = sortable;
            return this.topMentions;
	}
}

interface Hashtags {
	tweet: string;
	count: number;
}
interface Mentions {
	name: string;
	count: number;
}
interface Twitterers {
	name: string;
	count: number;
}