import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';
import * as suggestServiceAction from '../actions/suggest';

import { ApiResponseAggregations } from '../models/api-response';
import { Query, ReloactionAfterQuery } from '../models/query';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public headerImageUrl = 'assets/images/cow_150x175.png';
	public _queryControl: FormControl = new FormControl();
	public inputFocused = false;
	public apiResponseHashtags$: Observable<Array<{ tag: string, count: number }>>;
	public aggregations: ApiResponseAggregations;
	public areTopHashtagsAvailable: boolean;
	public topHashtags;

	constructor(
		private router: Router,
		private elementRef: ElementRef,
		private store: Store<fromRoot.State>,
		private titleService: Title

	) { }

	ngOnInit() {
		this.titleService.setTitle('Loklak Search');
		this.focusTextbox();
		this.setupSearchField();
		this.getTopHashtags();
		this.getDataFromStore();
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
					let re = new RegExp(/^followers:\s*([a-zA-Z0-9_@]+)/, 'i');
					let matches = re.exec(value);
					this.store.dispatch(new suggestServiceAction.SuggestAction({
						queryString: value,
						location: ReloactionAfterQuery.NONE
					}));
					if (matches == null) {
						this.store.dispatch(new apiAction.SearchAction({
							queryString: value,
							location: ReloactionAfterQuery.RELOCATE
						}));
						re = new RegExp(/^from:\s*([a-zA-Z0-9_@]+)/, 'i');
						matches = re.exec(value);
						if (matches !== null) {
							const screenName: string = matches[1];
							this.store.dispatch(new apiAction.FetchUserAction({
								queryString: screenName,
								location: ReloactionAfterQuery.NONE
							}));
						}
						this.store.dispatch(new apiAction.ShowSearchResults(''));
					} else {
						const screenName: string = matches[1];
						this.store.dispatch(new apiAction.FetchUserAction({
							queryString: screenName,
							location: ReloactionAfterQuery.NONE
						}));
						this.store.dispatch(new apiAction.ShowUserFeed(''));
					}
					this.router.navigateByUrl(`/search`, { skipLocationChange: true });
				}
			)
		);
	}

	private getTopHashtags() {
		this.store.dispatch(new apiAction.SearchAction({
			queryString: 'since:day',
			location: ReloactionAfterQuery.NONE
		}));
	}

	private getDataFromStore() {
		this.apiResponseHashtags$ = this.store.select(fromRoot.getApiResponseTags);
	}

	// private	sortHashtags(statistics) {
	// 	let sortable = [];
	// 	/* A check for both the data and the individual objects is necessary, also if the data is not empty*/
	// 	if ((statistics && statistics.hashtags !== undefined) && Object.keys(statistics.hashtags).length !== 0) {
	// 		for (const s in statistics.hashtags) {
	// 			if (s) {
	// 				sortable.push([s, statistics.hashtags[s]]);
	// 			}
	// 		}
	// 		sortable = (sortable.slice(0, 10));
	// 		this.topHashtags = sortable;
	// 		this.areTopHashtagsAvailable = true;
	// 		console.log(this.topHashtags);
	// 		return this.topHashtags;

	// 	}
	// 	else if (typeof statistics === 'undefined') {
	// 		this.topHashtags = [];
	// 		this.areTopHashtagsAvailable = false;
	// 		return this.topHashtags;
	// 	}
	// }

	/**
	 * Cleanup all the subscriptions when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}
