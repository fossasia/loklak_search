import { ApiResponseResult } from './../../models/api-response';
import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '../../models';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { hashtagRegExp, fromRegExp, mentionRegExp } from '../../utils/reg-exp';
import { defaultUrlConfig } from '../../shared/url-config';

@Component({
	selector: 'info-box',
	templateUrl: './info-box.component.html',
	styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnChanges {
	@Input() public query: Query;
	@Input() public ApiResponseResult: ApiResponseResult[];
	public query$: Observable<Query>;
	public inviewporttwitters: Observable<boolean>;
	public inviewportmentions: Observable<boolean>;
	public areTopHashtagsAvailable: boolean;
	public areTopTwitterersAvailable: boolean;
	public areTopMentionsAvailable: boolean;
	public areFrequencyDataAvailable: boolean;
	public topHashtags;
	public topMentions;
	public topTwitterers;
	public stringQuery;
	public queryString;
	public barChartLabels: string[] = ['0'];
	public barChartType = 'bar';
	public barChartLegend = true;
	public barChartData: any[] = [{ data: [0], label: 'Tweet Frequency' }];
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	public configUrl = defaultUrlConfig;

	constructor( private store: Store<fromRoot.State> ) {}

	ngOnChanges() {
		this.store.select(fromRoot.getQuery).subscribe(query => this.stringQuery = query.displayString);
		this.parseApiResponseData();
		if ( hashtagRegExp.exec(this.stringQuery) !== null ) {
			// Check for hashtag this.stringQuery
			this.queryString = '%23' + hashtagRegExp.exec(this.stringQuery)[1] + '' + hashtagRegExp.exec(this.stringQuery)[0];
		} else if ( fromRegExp.exec(this.stringQuery) !== null ) {
			// Check for from user this.stringQuery
			this.queryString = 'from%3A' + fromRegExp.exec(this.stringQuery)[1];
		} else if ( mentionRegExp.exec(this.stringQuery) !== null ) {
			// Check for mention this.stringQuery
			this.queryString = '%40' + mentionRegExp.exec(this.stringQuery)[1];
		} else {
			// for other queries
			this.queryString = this.stringQuery;
		}
	}
	sortHashtags(statistics) {
		/* A check for both the data and the individual objects is necessary, also if the data is not empty*/
		const stored = [];
		if (statistics !== undefined && statistics.length !== 0) {
			for (const s in statistics) {
				if (s) {
					for (let i = 0; i < statistics[s].length; i++) {
						if ( this.stringQuery.substring(1).toLowerCase() !== statistics[s][i].toLowerCase() ) {
							stored.push(statistics[s][i]);
						}
					}
				}
			}
			this.topHashtags = this.parseRawDataWithFrequency(stored);
			this.areTopHashtagsAvailable = this.topHashtags.length > 0;
			return this.topHashtags;

		} else if (typeof statistics === 'undefined') {
			this.topHashtags = [];
			this.areTopHashtagsAvailable = false;
			return this.topHashtags;
		}
	}
	sortTwiterers(statistics) {
		let sortable = [];
		const temp = [];
		for (let i = 0; i < statistics.length; i++) {
			let check = true;
			for (let j = 0; j < temp.length; j++) {
				if ( statistics[i][0] === temp[j][0] ) {
					check = false;
				}
			}
			if ( check ) {
				temp.push(statistics[i]);
			}
		}
		statistics = temp;
		for ( let i = 0; i < statistics.length - 1; i++ ) {
			for ( let j = i + 1; j < statistics.length; j++ ) {
				if (statistics[i][0] === statistics[j][0]) {
					if (i !== j) {
						statistics.splice(j, 1);
					}
				}
			}
		}
		if (statistics !== undefined && statistics.length !== 0) {
			for (const s in statistics) {
				if (s) {
					sortable.push([s, statistics[s]]);
				}
			}
			sortable.sort(function (a, b) {
				return b[1] - a[1];
			});
			sortable = (sortable.slice(0, 10));
			this.topTwitterers = sortable;
			this.areTopTwitterersAvailable = true;
			return this.topTwitterers;
		} else if (typeof statistics === 'undefined') {
			this.areTopTwitterersAvailable = false;
			this.topTwitterers = [];
			return this.topTwitterers;
		}

	}
	sortMentions(statistics) {
		const stored = [];
		if (statistics !== undefined && statistics.length !== 0) {
			for (const s in statistics) {
				if (s) {
					for (let i = 0; i < statistics[s][0].length; i++) {
						if ( this.stringQuery.substring(1).toLowerCase() !== statistics[s][0][i].toLowerCase() ) {
							stored.push(statistics[s][0][i]);
						}
					}
				}
			}
			this.topMentions = this.parseRawDataWithFrequency(stored);
			this.areTopMentionsAvailable = true;
			return this.topMentions;
		} else {
			this.areTopMentionsAvailable = false;
			this.topMentions = [];
			return this.topMentions;
		}
	}

	public parseRawDataWithFrequency(stored) {
		let topFrequencyData = [];
		stored = stored.reduce(function (acc, curr) {
			if (typeof acc[curr] === 'undefined') {
					acc[curr] = 1;
			} else {
				acc[curr] += 1;
			}
			return acc;
		}, []);
		topFrequencyData = Object.keys(stored)
		.map(key => key.trim())
		.filter(key => key !== '')
		.map(key => ([key, stored[key]]))
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10);
		return topFrequencyData;
	}

	public inviewtwitters(event) {
		if (event.value === true) {
			this.inviewporttwitters = event.value;
		}
	}

	public inviewmentions(event) {
		if (event.value === true) {
			this.inviewportmentions = event.value;
		}
	}

	parseApiResponseData() {
		const tagStrings = [];
		const screenStrings = [];
		const mentionStrings = [];
		const createdStrings = [];
		for ( let i = 0; i < this.ApiResponseResult.length; i++) {
			if (this.ApiResponseResult[i]['hashtags'].length !== 0) {
				tagStrings.push(this.ApiResponseResult[i]['hashtags']);
			}
			if (this.ApiResponseResult[i]['screen_name'].length !== 0) {
				screenStrings.push([
					this.ApiResponseResult[i]['screen_name'],
					this.ApiResponseResult[i]['user']['profile_image_url_https']
				]);
			}
			if (this.ApiResponseResult[i]['mentions'].length !== 0) {
				mentionStrings.push([
					this.ApiResponseResult[i]['mentions']
				]);
			}
			if (this.ApiResponseResult[i]['created_at'].length !== 0) {
				createdStrings.push(this.ApiResponseResult[i]['created_at']);
			}
		}
		this.sortHashtags(tagStrings);
		this.sortTwiterers(screenStrings);
		this.sortMentions(mentionStrings);
		this.getChartData(createdStrings);
	}

	getChartData(statistics) {

		for (let i = 0; i < statistics.length; i++) {
			statistics[i] = JSON.stringify(statistics[i]).substring(1, 11);
		}
		const count = {};
		statistics.forEach(function(i) { count[i] = (count[i] || 0) + 1; });
		if (statistics !== undefined && statistics.length !== 0) {
			const data = [];
			const labels = [];
			for (const key in count) {
				if (count.hasOwnProperty(key)) {
					data.push(count[key]);
					labels.push(key);
				}
			}

			this.barChartData[0].data = data;
			this.barChartLabels = labels;
			this.areFrequencyDataAvailable = true;

			return;
		} else {
			this.areFrequencyDataAvailable = false;
		}
	}
}
