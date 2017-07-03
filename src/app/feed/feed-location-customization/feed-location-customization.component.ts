import { Component, Input, Output, OnInit,
					EventEmitter,
					ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import * as queryAction from '../../actions/query';

import { Query } from '../../models';
import { countrycodearray } from '../../shared/countrycode/countrycode';

@Component({
	selector: 'feed-location-customization',
	templateUrl: './feed-location-customization.component.html',
	styleUrls: ['./feed-location-customization.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedLocationCustomizationComponent implements OnInit {
	@Output() hideLocationBox: EventEmitter<boolean> = new EventEmitter<boolean>();
	public location = null;
	public countries = countrycodearray;

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
	}

	public getLocationResults() {
		this.store.dispatch(new queryAction.LocationChangeAction(this.location));
	}

}
