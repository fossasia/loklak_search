import { Component, Input, Output, OnInit,
					EventEmitter,
					ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import * as queryAction from '../../actions/query';

import { Query } from '../../models';
import { FilterList, TimeBound } from '../../models';
import { countrycodearray } from '../../shared/countrycode/countrycode';

@Component({
	selector: 'feed-advanced-search',
	templateUrl: './feed-advanced-search.component.html',
	styleUrls: ['./feed-advanced-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedAdvancedSearchComponent implements OnInit {
	@Input() query: string;
	@Input() resultCount: number;
	private selectedTab = 'all';
	public showTools = false;
	public showTimeBox = false;
	public showLocationBox = false;
	private filterList: FilterList = {
			audio: false,
			image: false,
			video: false
	};

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
	}

	public show(type) {
		return (type === this.selectedTab);
	}

	public hideLocationBox(event) {
		this.showLocationBox = !(this.showLocationBox);
	}

	public hideTimeBox(event) {
		this.showTimeBox = !(this.showTimeBox);
	}

	public getAllResults() {
		this.filterList = {
			audio: false,
			image: false,
			video: false
		};
		this.selectedTab = 'all';
		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getImageResults() {
		this.filterList = {
			audio: false,
			image: true,
			video: false
		};
		this.selectedTab = 'image';
		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getVideoResults() {
		this.filterList = {
			audio: false,
			image: false,
			video: true
		};
		this.selectedTab = 'video';
		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getAnyLocation() {
		this.store.dispatch(new queryAction.LocationChangeAction(null));
	}

	public getAnyTime() {
		this.store.dispatch(new queryAction.TimeBoundChangeAction(null));
	}
}
