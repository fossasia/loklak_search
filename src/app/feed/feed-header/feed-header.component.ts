import { Component, Input, Output,
					OnInit, OnDestroy,
					EventEmitter,
					ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SuggestResults } from '../../models/api-suggest';
import { ApiResponseResult } from '../../models/api-response';

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
	@Output() filterTabs: EventEmitter<string> = new EventEmitter<string>();
	private selectedtab = 0;
	public searchInputControl = new FormControl();

	constructor() { }

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

	public filterResults(filtervalue) {
		/**
		 * This method's Implementation is removed for now.
		 * Re-implementation willbe required.
		 */
	}

	public getColor(value) {
		if (value === this.selectedtab) {
			return '#4285F4';
		}
	}

	public getCoordinates() {
		if (this.selectedtab === 0) {
			return '-80px';
		}
		else if (this.selectedtab === 1) {
			return '-12px';
		}
		else if (this.selectedtab === 2) {
			return '68px';
		}
	}

		ngOnDestroy() {
			this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
		}
}

