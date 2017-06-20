import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../../reducers';
import * as apiAction from '../../actions/api';
import { ApiResponseAggregations } from '../../models/api-response';
import { Query } from '../../models';

@Component({
	selector: 'info-box',
	templateUrl: './info-box.component.html',
	styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit, OnChanges {
	@Input() private query: Query;
	@Input() private apiResponseAggregations: ApiResponseAggregations;
	private inviewporttwitters: Observable<boolean>;
	private inviewportmentions: Observable<boolean>;
	public areTopHashtagsAvailable: boolean;
	public areTopTwitterersAvailable: boolean;
	public areTopMentionsAvailable: boolean;
	public areFrequencyDataAvailable: boolean;
	private topHashtags;
	private topMentions;
	private topTwitterers;

	public barChartLabels: string[] = ['0'];
	public barChartType = 'bar';
	public barChartLegend = true;
	public barChartData: any[] = [{ data: [0], label: 'Tweet Frequency' }];
	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() { }

	ngOnChanges() {
		this.sortHashtags(this.apiResponseAggregations);
		this.sortTwiterers(this.apiResponseAggregations);
		this.sortMentions(this.apiResponseAggregations);
		this.getChartData(this.apiResponseAggregations);
	}
	sortHashtags(statistics) {
		let sortable = [];
		/* A check for both the data and the individual objects is necessary, also if the data is not empty*/
		if ((statistics && statistics.hashtags !== undefined) && Object.keys(statistics.hashtags).length !== 0) {
			for (const s in statistics.hashtags) {
				if (s) {
					sortable.push([s, statistics.hashtags[s]]);
				}
			}
			sortable.sort(function (a, b) {
				return b[1] - a[1];
			});
			sortable = (sortable.slice(0, 10));
			this.topHashtags = sortable;
			this.areTopHashtagsAvailable = true;
			return this.topHashtags;

		}
		else if (typeof statistics === 'undefined') {
			this.topHashtags = [];
			this.areTopHashtagsAvailable = false;
			return this.topHashtags;
		}
	}
	sortTwiterers(statistics) {
		let sortable = [];
		if ((statistics && statistics.screen_name) !== undefined && (Object.keys(statistics.screen_name).length) !== 0) {
			for (const s in statistics.screen_name) {
				if (s) {
					sortable.push([s, statistics.screen_name[s]]);
				}
			}
			sortable.sort(function (a, b) {
				return b[1] - a[1];
			});
			sortable = (sortable.slice(0, 10));
			this.topTwitterers = sortable;
			this.areTopTwitterersAvailable = true;
			return this.topTwitterers;
		}
		else if (typeof statistics === 'undefined') {
			this.areTopTwitterersAvailable = false;
			this.topTwitterers = [];
			return this.topTwitterers;
		}

	}
	sortMentions(statistics) {
		let sortable = [];
		if ((statistics && statistics.mentions) !== undefined && (Object.keys(statistics.mentions).length !== 0)) {
			for (const s in statistics.mentions) {
				if (s) {
					sortable.push([s, statistics.mentions[s]]);
				}
			}
			sortable.sort(function (a, b) {
				return b[1] - a[1];
			});
			sortable = (sortable.slice(0, 10));
			this.topMentions = sortable;
			this.areTopMentionsAvailable = true;
			return this.topMentions;
		}
		else {
			this.areTopMentionsAvailable = false;
			this.topMentions = [];
			return this.topMentions;
		}
	}

	private inviewtwitters(event) {
		if (event.value === true) {
			this.inviewporttwitters = event.value;
		}
	}

	private inviewmentions(event) {
		if (event.value === true) {
			this.inviewportmentions = event.value;
		}
	}
	getChartData(statistics) {
		if ((statistics && statistics.created_at) !== undefined && (Object.keys(statistics.created_at).length !== 0)) {
			const data = [];
			const labels = [];
			const chosen_attr = statistics.created_at;


			for (const property in chosen_attr) {
				if (chosen_attr.hasOwnProperty(property)) {
					labels.push(property);
					data.push(chosen_attr[property]);
				}
			}

			this.barChartData[0].data = data;
			this.barChartLabels = labels;
			this.areFrequencyDataAvailable = true;

			return this.barChartData[0].data, this.barChartLabels;
		}
		else {
			this.areFrequencyDataAvailable = false;
		}
	}
}

