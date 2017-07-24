import { Component, OnInit,
		AfterViewInit, OnDestroy,
		ElementRef, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as mediaWallAction from '../actions/media-wall-query';

import { Query } from '../models/query';
import { ApiResponse, ApiResponseResult } from '../models/api-response';
import { WallHeader, WallBackground, WallCard } from '../models';



@Component({
	selector: 'app-media-wall',
	templateUrl: './media-wall.component.html',
	styleUrls: ['./media-wall.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallComponent implements OnInit, AfterViewInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();

	public query$: Observable<Query>;
	public apiWallResponseResults$: Observable<ApiResponseResult[]>;
	public isWallPaginating$: Observable<boolean>;
	public areWallResultsAvailable$: Observable<boolean>;
	public isWallSearching$: Observable<boolean>;
	public wallCustomHeader$: Observable<WallHeader>;
	public wallCustomCard$: Observable<WallCard>;
	public wallCustomBackground$: Observable<WallBackground>;

	public showToolBar = false;
	public showResults = false;
	public timer: Observable<any>;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private elementRef: ElementRef,
		private store: Store<fromRoot.State>,
		private ref: ChangeDetectorRef,
		private titleService: Title
	) { }

	ngOnInit() {
		this.queryFromURL();
		this.getDataFromStore();
		this.waitResultsTimings();
	}

	ngAfterViewInit() {
		this.focusTextbox();
	}

	/**
	 * Focus the Title on the `Loading` of the Feedpage.
	 */
	private focusTextbox(): void {
		this.elementRef.nativeElement.querySelector('media-wall-header .header-wrapper .header .title').focus();
	}

	private queryFromURL(): void {
		this.__subscriptions__.push(
			this.route.queryParams
					.subscribe((params: Params) => {
						const queryParam = params['query'] || '';
						this.search(queryParam);
					})
		);
	}

	public search(query: string) {
		if (query) {
			this.store.dispatch(new mediaWallAction.WallQueryChangeAction(query));
		}
	}

	/**
	 * Getting the data(Observables) from store into the component.
	 */
	private getDataFromStore(): void {
		this.query$ = this.store.select(fromRoot.getMediaWallQuery);
		this.apiWallResponseResults$ = this.store.select(fromRoot.getMediaWallResponseEntities);
		this.areWallResultsAvailable$ = this.store.select(fromRoot.getAreWallResultsAvailable);
		this.isWallPaginating$ = this.store.select(fromRoot.isWallPaginating);
		this.isWallSearching$ = this.store.select(fromRoot.getMediaWallLoading);
		this.wallCustomHeader$ = this.store.select(fromRoot.getMediaWallCustomHeader);
		this.wallCustomCard$ = this.store.select(fromRoot.getMediaWallCustomCard);
		this.wallCustomBackground$ = this.store.select(fromRoot.getMediaWallCustomBackground);
	}

	public displayToolBar(event) {
		if (!this.showToolBar) {
			this.showToolBar = true;
			this.ref.markForCheck();
			this.timer = Observable.timer(3000);
			this.__subscriptions__.push(
				this.timer.subscribe(() => {
					this.showToolBar = false;
					this.ref.markForCheck();
				})
			);
		}
	}

	public waitResultsTimings() {
		this.__subscriptions__.push(
			this.isWallSearching$.subscribe(value => {
				if (value === false) {
					setTimeout(() => {
						this.showResults = true;
					}, 50);
				}
				if (value === true) {
					this.showResults = false;
				}
				this.ref.markForCheck();
			})
		);
	}

	/**
	 * Clearup all the subscription when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
