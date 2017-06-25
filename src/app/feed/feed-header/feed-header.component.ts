import { Component, Input, Output,
					OnInit, OnDestroy,
					EventEmitter,
					ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import * as queryAction from '../../actions/query';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SuggestResults } from '../../models/api-suggest';
import { ApiResponseResult } from '../../models/api-response';
import { Query } from '../../models';
import { FilterList, TimeBound } from '../../models';
import { countrycodearray } from '../../shared/countrycode/countrycode';

@Component({
	selector: 'feed-header',
	templateUrl: './feed-header.component.html',
	styleUrls: ['./feed-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedHeaderComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	@Input() query: string;
	@Input() suggestionList: SuggestResults[];
	@Input() areResultsAvailable: boolean;
	@Input() resultsLoading: boolean;
	@Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() relocateEvent: EventEmitter<string> = new EventEmitter<string>();
	private selectedTab = 'all';
	public showTools = false;
	public showTimeBox = false;
	public showLocationBox = false;
	public location = null;
	public countries = countrycodearray;
	public filterList: FilterList = {
			audio: false,
			images: false,
			video: false
	};
	public timeBound: TimeBound = {
		since: null,
		until: null
	};
	public searchInputControl = new FormControl();
	public locationControl = new FormControl();
	public fromDateControl = new FormControl();
	public toDateControl = new FormControl();

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.setupSearchField();
	}

	private setupSearchField(): void {
		this.__subscriptions__.push(
			this.searchInputControl
					.valueChanges
					.subscribe(query => {
						this.searchEvent.emit(query);
					})
		);
	}

	public show(type) {
		return (type === this.selectedTab);
	}

	public getAllResults() {
		// this.filterList.audio = false;
		// this.filterList.images = false;
		// this.filterList.video = false;
		this.selectedTab = 'all';
		// this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getImageResults() {
		// this.filterList.images = true;
		// this.filterList.audio = false;
		// this.filterList.video = false;
		this.selectedTab = 'images';
		// this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getVideoResults() {
		// this.filterList.audio = false;
		// this.filterList.images = false;
		// this.filterList.video = true;
		this.selectedTab = 'video';
		// this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getAudioResults() {
		// this.filterList.audio = true;
		// this.filterList.images = false;
		// this.filterList.video = false;
		this.selectedTab = 'audio';
		// this.store.dispatch(new queryAction.FilterChangeAction(this.filterList));
	}

	public getAnyLocation() {
		this.location = null;
		// this.store.dispatch(new queryAction.LocationChangeAction(null));
	}

	public getAnyTime(time) {
		this.timeBound.since = null;
		this.timeBound.until = null;
		// this.store.dispatch(new queryAction.TimeBoundChangeAction(this.timeBound));
	}

	public getLocationResults() {
		// this.store.dispatch(new queryAction.LocationChangeAction(this.location));
	}

	public getTimeBoundResults() {
		// this.store.dispatch(new queryAction.TimeBoundChangeAction(this.timeBound));
	}

		ngOnDestroy() {
			this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
		}
}

