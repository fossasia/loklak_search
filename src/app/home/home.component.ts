import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as queryAction from '../actions/query';
import * as trendsAction from '../actions/trends';
import * as suggestAction from '../actions/suggest';

import { Query, ApiResponseTrendingHashtags } from '../models';
import { SpeechService } from '../services/speech.service';

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
	public trendingHashtagList: Array<string> = new Array<string>();
	public inputFocused = false;
	public apiResponseHashtags$: Observable<Array<{ tag: string, count: number }>>;

	constructor(
		private router: Router,
		private elementRef: ElementRef,
		private changeDetectorRef: ChangeDetectorRef,
		private store: Store<fromRoot.State>,
		private titleService: Title,
		private speech: SpeechService
	) {
		this.getHashTagsFromLastDay();
		this.getDataOfTrendingHashTags();
	}

	speechRecognition() {
		this.speech.record('en_US').subscribe(voice => this.router.navigate([`/search`],
		{ queryParams: { query: voice }, skipLocationChange: true } ));
	}

	ngOnInit() {
		this.titleService.setTitle('Loklak Search - Distributed Open Source Search for Twitter and Social Media with Peer to Peer Technology');
		this.focusTextbox();
		this.setupSearchField();
		this.getDataFromStore();
		this.getTopHashtags();
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
					this.store.dispatch(new queryAction.RelocationAfterQuerySetAction());
					this.store.dispatch(new suggestAction.SuggestAction(value));
					this.store.dispatch(new queryAction.InputValueChangeAction(value));
					this.router.navigate([`/search`], { queryParams: { query: value }, skipLocationChange: true } );
				}
			)
		);
	}

	private getTopHashtags() {
		this.store.dispatch(new trendsAction.SearchTrendingHashtagsAction());
	}

	private getDataFromStore() {
		this.__subscriptions__.push(
			this.store.select(fromRoot.getApiHashtagTrends)
								.subscribe(trends => {
									if (!trends || !trends.aggregations.hashtags) {
										return;
									}
									Object.keys(trends.aggregations.hashtags).forEach(hashtag => {
										this.trendingHashtagList.push(hashtag);
									});
									this.changeDetectorRef.detectChanges();
								})
		);

	}

	private getDataOfTrendingHashTags() {
		this.apiResponseHashtags$ = this.store.select(fromRoot.getApiResponseTags);
	}

	private getHashTagsFromLastDay() {
		this.store.dispatch(new queryAction.RelocationAfterQueryResetAction());
		this.store.dispatch(new queryAction.InputValueChangeAction('since:day'));
	}

	/**
	 * Cleanup all the subscriptions when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
		this.speech.stoprecord();
	}
}
