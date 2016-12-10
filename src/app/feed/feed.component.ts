import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';

import { ApiResponse, ApiResponseMetadata, ApiResponseResult } from '../models/api-response';
import { Query, ReloactionAfterQuery } from '../models/query';


@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	private _queryControl: FormControl =  new FormControl();
	private query$: Observable<Query>;
	private queryString: string;
	private isSearching$: Observable<boolean>;
	private areResultsAvailable$: Observable<boolean>;
	private apiResponseResults$: Observable<ApiResponseResult[]>;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private store: Store<fromRoot.State>,
		private elementRef: ElementRef,
	) { }

	ngOnInit() {
		this.focusTextbox();
		this.queryFromURL();
		this.getDataFromStore();
		this.subscribeQueryString();
		this.setupSearchField();
	}

	/**
	 * Focus the search box on the `Loading` of the Feedpage.
	 */
	private focusTextbox(): void {
		this.elementRef.nativeElement.querySelector('feed-header input#search').focus();
	}

	/**
	 * Checking if there is query param in url and if there is a query param
	 * loading it in the application and dispatching the action for saving the
	 * new query state.
	 * Also set the value of `_queryControl` to display the appropriate content
	 * in search-bar.
	 */
	private queryFromURL(): void {
		this.__subscriptions__.push(
			this.route.queryParams
								.subscribe((params: Params) => {
									let queryParam = params['query'] || '';
									if (queryParam) {
										this.store.dispatch(new apiAction.SearchAction({
											queryString: queryParam,
											location: ReloactionAfterQuery.NONE
										}));
										this._queryControl.setValue(queryParam);
									}
								})
		);
	}

	/**
	 * Getting the data(Observables) from store into the component.
	 */
	private getDataFromStore(): void {
		this.query$ = this.store.select(fromRoot.getSearchQuery);
		this.isSearching$ = this.store.select(fromRoot.getSearchLoading);
		this.areResultsAvailable$ = this.store.select(fromRoot.getAreResultsAvailable);
		this.apiResponseResults$ = this.store.select(fromRoot.getApiResponseEntities);
	}

	/**
	 * Sets up a subscription for the `query$` so that it can be used
	 * to hold and transfer the latest value of query state in
	 * `string` form instead of subscribing everytime.
	 */
	private subscribeQueryString(): void {
		this.__subscriptions__.push(
			this.query$
					.subscribe(query => {
						this.queryString = query.queryString;
					})
		);
	}

	/**
	 * Setup for the `FormControl` of the search field.
	 * Set the initial value of input field from store.
	 * Subscribes to the valueChange Observable, and dispatches `SearchAction`
	 * if the value is different then already in store.
	 */
	private setupSearchField(): void {
		this._queryControl.setValue(this.queryString);
		this.__subscriptions__.push(
			this._queryControl.valueChanges
												.subscribe(query => {
													if (this.queryString !== query) {
														this.store.dispatch(new apiAction.SearchAction({
															queryString: query,
															location: ReloactionAfterQuery.RELOCATE
														}));
													}
												})
		);
	}

	/**
	 * Handles the Query request when Enter key is pressed `explicitly` in input.
	 * There is an only need to change the location as the current request
	 * is already being fetched (ngrx/effects).
	 */
	handleSearchQuery() {
		this.location.go('/search', `query=${this.queryString}`);
	}

	/**
	 * Clearup all the subscription when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}
