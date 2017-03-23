import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../../reducers';
import * as apiAction from '../../actions/api';
import { ApiResponseAggregations } from '../../models/api-response';
import { Query, ReloactionAfterQuery } from '../../models';

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
	private topHashtags;
	private topMentions;
	private topTwitterers;


	public barChartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	public barChartLabels: string[] = ["0"];
	public barChartType: string = 'bar';
	public barChartLegend: boolean = true;
	public barChartData: any[] = [
		{ data: [0], label: 'Tweet Frequency' }
	];

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
		for (let s in statistics.hashtags) {
			sortable.push([s, statistics.hashtags[s]]);
		}
		sortable.sort(function (a, b) {
			return b[1] - a[1];
		});
		sortable = (sortable.slice(0, 10));
		this.topHashtags = sortable;
		return this.topHashtags;
	}
	sortTwiterers(statistics) {
		let sortable = [];
		for (let s in statistics.screen_name) {
			sortable.push([s, statistics.screen_name[s]]);
		}
		sortable.sort(function (a, b) {
			return b[1] - a[1];
		});
		sortable = (sortable.slice(0, 10));
		this.topTwitterers = sortable;
		return this.topTwitterers;
	}
	sortMentions(statistics) {
		let sortable = [];
		for (let s in statistics.mentions) {
			sortable.push([s, statistics.mentions[s]]);
		}
		sortable.sort(function (a, b) {
			return b[1] - a[1];
		});
		sortable = (sortable.slice(0, 10));
		this.topMentions = sortable;
		return this.topMentions;
	}

	private inviewtwitters(event) {
		if (event.value == true) {
			this.inviewporttwitters = event.value;
		}
	}

	private inviewmentions(event) {
		if (event.value == true) {
			this.inviewportmentions = event.value;
		}
	}
	getChartData(statistics) {
		var data = [];
		var labels = [];
		var chosen_attr = statistics.created_at;


		for (var property in chosen_attr) {
			if (chosen_attr.hasOwnProperty(property)) {
				labels.push(property);
				data.push(chosen_attr[property]);
			}
		}

		this.barChartData[0].data = data;
		this.barChartLabels = labels;
		return this.barChartData[0].data, this.barChartLabels;

	}


}

