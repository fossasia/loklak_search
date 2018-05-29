import {
	Component,
	Input,
	Output,
	ViewChild,
	OnInit,
	EventEmitter,
	ChangeDetectionStrategy,
	ElementRef
} from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as queryAction from '../../actions/query';

import { Query, FilterList, TimeBound } from '../../models';
import { countrycodearray } from '../../shared/countrycode/countrycode';

@Component({
	selector: 'feed-advanced-search',
	templateUrl: './feed-advanced-search.component.html',
	styleUrls: ['./feed-advanced-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedAdvancedSearchComponent implements OnInit {
	public isSearching$: Observable<boolean>;
	public areResultsAvailable$: Observable<boolean>;
	public query$: Observable<Query>;
	public showTools = false;
	private toolList;
	public selectedTab = 'all';
	public viewButtonChecked = false;
	public timeBoundButtonChecked = false;
	public timeBoundValue = 'Any time';
	public locationButtonChecked = false;
	public locationValue = 'All Countries';

	private filterList: FilterList = {
		image: false,
		video: false
	};

	private timeBound: TimeBound = {
		since: null,
		until: null
	};

	private location = null;

	constructor(
		private store: Store<fromRoot.State>,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.toolList = this.elementRef.nativeElement.querySelector('.wrapper .tools .tool-list');
		this.toolList.inert = true;
		this.getDataFromStore();
	}

	private getDataFromStore() {
		this.isSearching$ = this.store.select(fromRoot.getSearchLoading);
		this.areResultsAvailable$ = this.store.select(fromRoot.getAreResultsAvailable);
		this.query$  = this.store.select(fromRoot.getQuery);
	}

	public toggleSearchTools() {
		this.showTools = !this.showTools;
		this.toolList.inert = !this.toolList.inert;
	}

	public getFilterResults(value: string) {
		if (value === 'all') {
			this.selectedTab = 'all';
			this.filterList = {
				image: false,
				video: false
			};
		} else if (value === 'image') {
			this.selectedTab = 'image';
			this.filterList = {
				image: true,
				video: false
			};
		} else if (value === 'video') {
			this.selectedTab = 'video';
			this.filterList = {
				image: false,
				video: true
			};
		} else {
			this.selectedTab = 'all';
			this.filterList = {
				image: false,
				video: false
			};
		}

		this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getTimeBoundResults(value: string) {
		if (value === 'any')  {
			this.timeBoundValue = 'Any time';
			this.timeBound = {
				since: null,
				until: null
			};
		} else if (value === 'lastDay') {
			this.timeBoundValue = 'Past 24 hours';
			const date24HoursBefore = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
			this.timeBound = {
				since: date24HoursBefore,
				until: null
			};
		} else if (value === 'lastWeek') {
			this.timeBoundValue = 'Past week';
			const date1WeekBefore = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
			this.timeBound = {
				since: date1WeekBefore,
				until: null
			};
		} else {
			this.timeBoundValue = 'Any time';
			this.timeBound = {
				since: null,
				until: null
			};
		}

		this.store.dispatch(new queryAction.TimeBoundChangeAction(this.timeBound));
	}

	public getLocationBasedResults(value: string) {
		if (value === 'all') {
			this.locationValue = 'All Countries';
			this.location = null;
		} else if (value === 'India') {
			this.locationValue = 'Country: India';
			this.location = 'India';
		} else if (value === 'China') {
			this.locationValue = 'Country: China';
			this.location = 'China';
		} else if (value === 'US') {
			this.locationValue = 'Country: US';
			this.location = 'US';
		} else if (value === 'UK') {
			this.locationValue = 'Country: UK';
			this.location = 'UK';
		} else {
			this.locationValue = 'All Countries';
			this.location = null;
		}

		this.store.dispatch(new queryAction.LocationChangeAction(this.location));
	}
}
