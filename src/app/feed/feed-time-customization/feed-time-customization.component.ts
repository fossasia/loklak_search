import { Component, Input, Output, OnInit,
					EventEmitter,
					ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import * as queryAction from '../../actions/query';

import { Query } from '../../models';
import { TimeBound } from '../../models';

@Component({
	selector: 'feed-time-customization',
	templateUrl: './feed-time-customization.component.html',
	styleUrls: ['./feed-time-customization.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedTimeCustomizationComponent implements OnInit {
	@Output() hideTimeBox: EventEmitter<boolean> = new EventEmitter<boolean>();
	public timeBound: TimeBound = {
		since: null,
		until: null
	};
	public since: string;
	public until: string;

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
	}

	public getTimeBoundResults() {
		this.timeBound = {
			since: new Date(this.since),
			until: new Date(this.until)
		};
		this.store.dispatch(new queryAction.TimeBoundChangeAction(this.timeBound));
	}

}
