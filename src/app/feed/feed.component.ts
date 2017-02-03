import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';
import * as paginationAction from '../actions/pagination';
import * as suggestServiceAction from '../actions/suggest';

import { ApiResponse, ApiResponseMetadata, ApiResponseResult, ApiResponseAggregations } from '../models/api-response';
import { SuggestMetadata, SuggestResults, SuggestResponse } from '../models/api-suggest';
import { Query, ReloactionAfterQuery } from '../models/query';
import { UserApiResponse } from '../models/api-user-response';


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
	private apiResponseTags$: Observable<Tag[]>;
	private apiResponseAggregations$: Observable<ApiResponseAggregations>;
	private isNextPageLoading$: Observable<boolean>;
	private areMorePagesAvailable$: Observable<boolean>;
	private visibility: boolean = false;
	private display: boolean = true;
	private isLightboxSelected$: Observable<boolean>;
	private LightboxgetSelectedItem$: Observable<ApiResponseResult>;
	private apiResponseUser$: Observable<UserApiResponse>;
	private isUserResponseLoading$: Observable<boolean>;
	private showUserInfo$: Observable<boolean>;
	private suggestServiceQuery$: Observable<Query>;
	private isSuggestServiceLoading$: Observable<boolean>;
	private suggestResponse$: Observable<SuggestResults[]>;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private store: Store<fromRoot.State>,
		private elementRef: ElementRef,
	) {  }

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
						var re = new RegExp(/^from:\s*([a-zA-Z0-9_@]+)/, 'i');
						var matches = re.exec(queryParam);
						if(matches !== null) {
							var screenName: string = matches[1];
							this.store.dispatch(new apiAction.FetchUserAction({
								queryString: screenName,
								location: ReloactionAfterQuery.NONE
							}));
						}
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
		this.apiResponseTags$  = this.store.select(fromRoot.getApiResponseTags);
		this.isNextPageLoading$ = this.store.select(fromRoot.getPageLoading);
		this.areMorePagesAvailable$ = this.store.select(fromRoot.getPagesAvailable);
		this.apiResponseAggregations$ = this.store.select(fromRoot.getApiAggregations);
		this.isLightboxSelected$ = this.store.select(fromRoot.getLightboxIsSelected);
		this.LightboxgetSelectedItem$ = this.store.select(fromRoot.getLightboxgetSelectedItem);
		this.apiResponseUser$ = this.store.select(fromRoot.getApiUserResponse);
		this.isUserResponseLoading$ = this.store.select(fromRoot.isUserResponseLoading);
		this.showUserInfo$ = this.store.select(fromRoot.getShowUserInfo);
		this.suggestServiceQuery$ = this.store.select(fromRoot.getSuggestServiceQuery);
		this.isSuggestServiceLoading$ = this.store.select(fromRoot.getSuggestServiceLoading);
		this.suggestResponse$ = this.store.select(fromRoot.getSuggestResponseEntities);

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
														this.store.dispatch(new suggestServiceAction.SuggestAction({
															queryString: query,
															location: ReloactionAfterQuery.NONE
														}));
														this.store.dispatch(new apiAction.SearchAction({
															queryString: query,
															location: ReloactionAfterQuery.RELOCATE
														}));
														var re = new RegExp(/^from:\s*([a-zA-Z0-9_@]+)/, 'i');
														var matches = re.exec(query);
														if(matches !== null) {
															var screenName: string = matches[1];
															this.store.dispatch(new apiAction.FetchUserAction({
																queryString: screenName,
																location: ReloactionAfterQuery.NONE
															}));
														}

														// if(matches !== null) {
														// 	this.store.dispatch(new apiAction.FetchUserAction({
														// 		screenName: screenName
														// 	}));
														// }
													}
												})
		);
	}

	/**
	 * Handles the Query request when Enter key is pressed `explicitly` in input.
	 * There is an only need to change the location as the current request
	 * is already being fetched (ngrx/effects).
	 */
	private handleSearchQuery() {
		this.location.go('/search', `query=${this.queryString}`);
	}

	/**
	 * Loads more results by dispatching the `NextPageAction`.
	 */
	private loadMoreResults(event) {
		this.store.dispatch(new paginationAction.NextPageAction(''));
	}

	/**
	/* Lightbox handling :- showlightbox updates the lightbox with feed and hidelightbox removes the feed
	*/

	private showhidelightbox(event) {
		if(event.show == 'hide') {
			this.visibility= false;
			this.store.dispatch(new apiAction.UnSelectLightbox(event));
			this.display= false;
		}
		else if((event.feedIndex+1)&&(event.show == 'show') && (this.display==false)) {
			this.display=true;
			this.visibility=false;

		}
		else if ((event.feedIndex+1)&&(event.show == 'show') && (this.display==true)){
			this.visibility= true;
			this.store.dispatch(new apiAction.SelectLightbox(event.feedIndex));
		}

	}

	private hidelightbox(event) {
		this.visibility= false;
		this.store.dispatch(new apiAction.UnSelectLightbox(event));
	}

	/**
	 * Clearup all the subscription when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}

interface Tag {
	tag: string;
	count: number;
}
