import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as queryAction from '../actions/query';
import * as trendsAction from '../actions/trends';
import * as suggestAction from '../actions/suggest';
import * as speechactions from '../actions/speech';
import * as titleAction from '../actions/title';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentChecked {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public headerImageUrl = 'assets/images/cow_150x175.png';
	public _queryControl: FormControl = new FormControl();
	public trendingHashtagList: Array<string> = new Array<string>();
	public inputFocused = false;
	hidespeech: Observable<boolean>;
	public apiResponseHashtags$: Observable<Array<{ tag: string, count: number }>>;

	constructor(
		private router: Router,
		private elementRef: ElementRef,
		private changeDetectorRef: ChangeDetectorRef,
		private store: Store<fromRoot.State>
	) {
		this.hidespeech = store.select(fromRoot.getspeechStatus);
		this.getHashTagsFromLastDay();
		this.getDataOfTrendingHashTags();
	}

	speechRecognition() {
		this.store.dispatch(new speechactions.SearchAction(true));
	}

	ngOnInit() {
		this.store.dispatch(new titleAction.SetTitleAction('Loklak Search - ' +
			'Distributed Open Source Search for Twitter and Social Media with Peer to Peer Technology'));
		this.focusTextbox();
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
	 * gets the input value when user clicks Enter(13) and dispatches `SearchAction`
	 * when the query is not empty or containing spaces.
	 * If query is non empty and user clicks enter, then user is redirected to the `FeedPage`.
	 */

	onEnter(event: any) {
		if (event.which === 13) {
			if (this._queryControl.value.trim() !== '') {
				this.store.dispatch(new queryAction.RelocationAfterQuerySetAction());
				this.store.dispatch(new suggestAction.SuggestAction(this._queryControl.value.trim()));
				this.store.dispatch(new queryAction.InputValueChangeAction(this._queryControl.value.trim()));
				this.router.navigate([`/search`], { queryParams: { query: this._queryControl.value.trim() }, skipLocationChange: true } );
				this.store.dispatch(new titleAction.SetTitleAction(this._queryControl.value.trim() + ' - Loklak Search'));
				this.getDataFromStore();
			}
		}
	}

	private getTopHashtags() {
		this.store.dispatch(new trendsAction.SearchTrendingHashtagsAction());
	}

	ngAfterContentChecked() {
		this.store.dispatch(new titleAction.SetTitleAction('Loklak Search - ' +
			'Distributed Open Source Search for Twitter and Social Media with Peer to Peer Technology'));
	}

	private getDataFromStore() {
		this.__subscriptions__.push(
			this.store
				.select(fromRoot.getApiHashtagTrends)
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
	}
}
