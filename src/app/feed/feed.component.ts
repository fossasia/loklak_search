import { Component,
					OnInit, AfterViewInit, OnDestroy,
					ChangeDetectionStrategy, ElementRef, HostListener } from '@angular/core';

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
export class FeedComponent implements OnInit, AfterViewInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();

	public query$: Observable<Query>;
	public isSearching$: Observable<boolean>;
	public areResultsAvailable$: Observable<boolean>;
	public apiResponseResults$: Observable<ApiResponseResult[]>;
	public apiResponseTags$: Observable<Tag[]>;
	public apiResponseAggregations$: Observable<ApiResponseAggregations>;
	public isNextPageLoading$: Observable<boolean>;
	public areMorePagesAvailable$: Observable<boolean>;
	public visibility = false;
	public display = true;
	public isLightboxSelected$: Observable<boolean>;
	public LightboxgetSelectedItem$: Observable<ApiResponseResult>;
	public apiResponseUser$: Observable<UserApiResponse>;
	public apiResponseUserFollowers$: Observable<UserApiResponse[]>;
	public apiResponseUserFollowing$: Observable<UserApiResponse[]>;
	public isUserResponseLoading$: Observable<boolean>;
	public showUserInfo$: Observable<boolean>;
	public suggestServiceQuery$: Observable<Query>;
	public isSuggestServiceLoading$: Observable<boolean>;
	public suggestResponse$: Observable<SuggestResults[]>;
	public showUserFeed$: Observable<boolean>;
	public index = 12;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private store: Store<fromRoot.State>,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.queryFromURL();
		this.getDataFromStore();
	}

	ngAfterViewInit() {
		this.focusTextbox();
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
						const queryParam = params['query'] || '';
						this.search(queryParam);
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
		this.apiResponseTags$ = this.store.select(fromRoot.getApiResponseTags);
		this.isNextPageLoading$ = this.store.select(fromRoot.getPageLoading);
		this.areMorePagesAvailable$ = this.store.select(fromRoot.getPagesAvailable);
		this.apiResponseAggregations$ = this.store.select(fromRoot.getApiAggregations);
		this.isLightboxSelected$ = this.store.select(fromRoot.getLightboxIsSelected);
		this.LightboxgetSelectedItem$ = this.store.select(fromRoot.getLightboxgetSelectedItem);
		this.apiResponseUser$ = this.store.select(fromRoot.getApiUserResponse);
		this.apiResponseUserFollowing$ = this.store.select(fromRoot.getApiUserFollowingResponse);
		this.apiResponseUserFollowers$ = this.store.select(fromRoot.getApiUserFollowersResponse);
		this.isUserResponseLoading$ = this.store.select(fromRoot.isUserResponseLoading);
		this.showUserInfo$ = this.store.select(fromRoot.getShowUserInfo);
		this.suggestServiceQuery$ = this.store.select(fromRoot.getSuggestServiceQuery);
		this.isSuggestServiceLoading$ = this.store.select(fromRoot.getSuggestServiceLoading);
		this.suggestResponse$ = this.store.select(fromRoot.getSuggestResponseEntities);
		this.showUserFeed$ = this.store.select(fromRoot.getShowUserFeed);
	}

	/**
	 * Dispatches the search actions according to the type of the string.
	 *
	 * @param query : The query term which is dispatched to the store.
	 */
	public search(query: string) {
		if (query) {
				let re = new RegExp(/^followers:\s*([a-zA-Z0-9_@]+)/, 'i');
				let matches = re.exec(query);
				if (matches == null) {
					this.store.dispatch(new suggestServiceAction.SuggestAction({
						queryString: query,
						location: ReloactionAfterQuery.NONE
					}));
					this.store.dispatch(new apiAction.SearchAction({
						queryString: query,
						location: ReloactionAfterQuery.RELOCATE
					}));
					re = new RegExp(/^from:\s*([a-zA-Z0-9_@]+)/, 'i');
					matches = re.exec(query);
					if (matches !== null) {
						this.store.dispatch(new apiAction.FetchUserAction({
							queryString: query,
							location: ReloactionAfterQuery.NONE
						}));
					}
					this.store.dispatch(new apiAction.ShowSearchResults(''));
				} else {
					this.store.dispatch(new apiAction.FetchUserAction({
						queryString: query,
						location: ReloactionAfterQuery.RELOCATE
					}));
					this.store.dispatch(new apiAction.ShowUserFeed(''));
				}
				this.store.dispatch(new paginationAction.RevertPaginationState(''));
			}
	}

	/**
	 * Handles the Query request when Enter key is pressed `explicitly` in input.
	 * There is an only need to change the location as the current request
	 * is already being fetched (ngrx/effects).
	 *
	 * @param query : The string term which is set as parameter to url.
	 */
	public relocateURL(query: string) {
		const URIquery = encodeURIComponent(query);
		this.location.go('/search', `query=${URIquery}`);
	}

	/**
	 * Loads more results by dispatching the `NextPageAction`.
	 */
	public loadMoreResults(event) {
		this.store.dispatch(new paginationAction.NextPageAction(''));
	}

	/**
	/* Lightbox handling :- showlightbox updates the lightbox with feed and hidelightbox removes the feed
	*/
	private showhidelightbox(event) {
		if (event.show === 'hide') {
			this.visibility = false;
			this.store.dispatch(new apiAction.UnSelectLightbox(event));
			this.display = false;
		}
		else if ((event.feedIndex + 1) && (event.show === 'show') && (this.display === false)) {
			this.display = true;
			this.visibility = false;

		}
		else if ((event.feedIndex + 1) && (event.show === 'show') && (this.display === true)) {
			this.visibility = true;
			this.store.dispatch(new apiAction.SelectLightbox(event.feedIndex));
		}

	}

	public hidelightbox(event) {
		this.visibility = false;
		this.store.dispatch(new apiAction.UnSelectLightbox(event));
	}

	public filterResults(query: string) {
		/**
		 * Implementation removed, Re-implementation will be required.
		 */
	}

	showMoreUsers() {
		const subscriber = this.apiResponseUserFollowers$.subscribe(apiResponseUserFollowers => {
			const length = apiResponseUserFollowers.length;
			if (this.index < 24 && length > this.index) {
				this.index += 12;
			} else if (length > this.index) {
				this.index += 24;
			}
		});
		subscriber.unsubscribe();
	}

	/**
	 * Clearup all the subscription when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

	private sortUsers(users: Array<UserApiResponse>) {
		users.sort(function (a, b) {
			if (b.followers_count === a.followers_count) {
				return b.statuses_count - a.statuses_count;
			}
			return b.followers_count - a.followers_count;
		});
		return users;
	}
}

interface Tag {
	tag: string;
	count: number;
}
