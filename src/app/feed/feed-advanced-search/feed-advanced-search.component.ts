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
	public selectedTab = 'all';
	private filterList: FilterList = {
			image: false,
			video: false
	};

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
	}

	public getAllResults() {
		this.filterList = {
			image: false,
			video: false
		};
		this.selectedTab = 'all';
		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getImageResults() {
		this.filterList = {
			image: true,
			video: false
		};
		this.selectedTab = 'image';
		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getVideoResults() {
		this.filterList = {
			image: false,
			video: true
		};
		this.selectedTab = 'video';
		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}
}
