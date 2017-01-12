import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';

import { Query, ReloactionAfterQuery } from '../models/query';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	private header: string = 'loklak Search!';
	private headerImageUrl: string = 'assets/images/cow_150x175.png';
	private _queryControl: FormControl = new FormControl();

	constructor(
		private router: Router,
		private elementRef: ElementRef,
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.focusTextbox();
		this.setupSearchField();
	}

	/**
	 * Focus the search box on the `Loading` of the Homepage.
	 */
	private focusTextbox() {
		this.elementRef.nativeElement.querySelector('div.search-form input#search').focus();
	}

	/**
	 * Setup for the `FormControl` of the search field.
	 * Subscribes to the valueChange Observable, and dispatches `SearchAction`
	 * when value changes along with redirecting to the `FeedPage`.
	 */
	private setupSearchField() {
		this.__subscriptions__.push(
			this._queryControl.valueChanges
												.subscribe((value) => {
													this.store.dispatch(new apiAction.SearchAction({
														queryString: value,
														location: ReloactionAfterQuery.NONE
													}));
													this.router.navigateByUrl(`/search`, { skipLocationChange: true });
												})
		);
	}

	/**
	 * Cleanup all the subscriptions when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}
