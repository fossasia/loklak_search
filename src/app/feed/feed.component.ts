import {
	Component,
	OnInit,
	AfterViewInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ElementRef,
	HostListener
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';
import * as queryAction from '../actions/query';
import * as paginationAction from '../actions/pagination';
import * as suggestAction from '../actions/suggest';

import {
	ApiResponse,
	ApiResponseMetadata,
	ApiResponseResult,
	ApiResponseAggregations } from '../models/api-response';
import { SuggestMetadata, SuggestResults, SuggestResponse } from '../models/api-suggest';
import { Query, parseStringToQuery } from '../models/query';
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

	public isUserInfoSearching$: Observable<boolean>;
	public areUserResultsValid$: Observable<boolean>;
	public apiResponseUser$: Observable<UserApiResponse>;
	public apiResponseUserFollowers$: Observable<UserApiResponse[]>;
	public apiResponseUserFollowing$: Observable<UserApiResponse[]>;

	public suggestQuery$: Observable<Query>;
	public isSuggestLoading$: Observable<boolean>;
	public suggestResponse$: Observable<SuggestResults[]>;

	public apiResponseHashtags$: Observable<Array<{ tag: string, count: number }>>;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private store: Store<fromRoot.State>,
		private elementRef: ElementRef,
		private titleService: Title
	) {
		this.getTopHashtags();
		this.getHashtagDataFromStore();
	}

	ngOnInit() {
		this.queryFromURL();
		this.getDataFromStore();
	}

	ngAfterViewInit() {
		this.focusTextbox();
	}

	getTopHashtags() {
		this.store.dispatch(new queryAction.RelocationAfterQueryResetAction());
		this.store.dispatch(new queryAction.InputValueChangeAction('since:day'));
	}

	getHashtagDataFromStore() {
		this.apiResponseHashtags$ = this.store.select(fromRoot.getApiResponseTags);
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
					const query: Query = parseStringToQuery(queryParam);
					this.store.dispatch(new queryAction.RelocationAfterQuerySetAction());
					this.store.dispatch(new queryAction.QueryChangeAction(query));
					this.store.dispatch(new suggestAction.SuggestAction(query.displayString));
					this.store.dispatch(new paginationAction.RevertPaginationState(''));
				})
		);
	}

	/**
	 * Getting the data(Observables) from store into the component.
	 */
	private getDataFromStore(): void {
		this.query$ = this.store.select(fromRoot.getQuery);
		this.isSearching$ = this.store.select(fromRoot.getSearchLoading);
		this.areResultsAvailable$ = this.store.select(fromRoot.getAreResultsAvailable);
		this.apiResponseResults$ = this.store.select(fromRoot.getApiResponseEntities);
		this.apiResponseTags$ = this.store.select(fromRoot.getApiResponseTags);
		this.isNextPageLoading$ = this.store.select(fromRoot.getPageLoading);
		this.areMorePagesAvailable$ = this.store.select(fromRoot.getPagesAvailable);
		this.apiResponseAggregations$ = this.store.select(fromRoot.getApiAggregations);

		this.isUserInfoSearching$ = this.store.select(fromRoot.getUserSearchLoading);
		this.areUserResultsValid$ = this.store.select(fromRoot.getAreApiUserResultsValid);
		this.apiResponseUser$ = this.store.select(fromRoot.getApiUserResponse);
		this.apiResponseUserFollowing$ = this.store.select(fromRoot.getApiUserFollowingResponse);
		this.apiResponseUserFollowers$ = this.store.select(fromRoot.getApiUserFollowersResponse);

		this.suggestQuery$ = this.store.select(fromRoot.getSuggestQuery);
		this.isSuggestLoading$ = this.store.select(fromRoot.getSuggestLoading);
		this.suggestResponse$ = this.store.select(fromRoot.getSuggestResponseEntities);
	}

	/**
	 * Dispatches the search actions according to the type of the string.
	 *
	 * @param query : The query term which is dispatched to the store.
	 */
	public search(query: string) {
		if (query) {
			this.store.dispatch(new queryAction.RelocationAfterQuerySetAction());
			this.store.dispatch(new suggestAction.SuggestAction(query));
			this.store.dispatch(new queryAction.InputValueChangeAction(query));
			this.store.dispatch(new paginationAction.RevertPaginationState(''));
		}
	}

	/**
	 * Joins the observable streams which are responsible for opening and closing of
	 * suggestion box.
	 */
	public doCloseSuggestBox$(): Observable<boolean> {
		const doCloseSuggestBox =
			this.isSearching$
					.combineLatest(this.areResultsAvailable$, (isSearching, areResultsAvailable) => {
						if (isSearching || !areResultsAvailable) {
							return false;
						} else {
							return true;
						}
					});
		return doCloseSuggestBox;
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

		if (!this.location.isCurrentPathEqualTo(`/search?query=${URIquery}`)) {
			this.location.go(`/search?query=${URIquery}`);
		}
	}

	/**
	 * Loads more results by dispatching the `NextPageAction`.
	 */
	public loadMoreResults(event) {
		this.store.dispatch(new paginationAction.NextPageAction(''));
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
