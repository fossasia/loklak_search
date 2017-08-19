import { Component, OnInit,
		OnDestroy,
		ElementRef, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {MdDialog, MdDialogRef} from '@angular/material';
import { MediaWallCustomizationComponent } from './media-wall-customization/media-wall-customization.component';
import { MediaWallQueryComponent } from './media-wall-query/media-wall-query.component';
import { MediaWallModerationComponent } from './media-wall-moderation/media-wall-moderation.component';
import { MediaWallDesignComponent } from './media-wall-design/media-wall-design.component';
import { Title } from '@angular/platform-browser';
import { MasonryOptions } from '../app-masonry';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as mediaWallAction from '../actions/media-wall-query';
import * as mediaWallDesignAction from '../actions/media-wall-design';

import { Query } from '../models/query';
import { ApiResponse, ApiResponseResult } from '../models/api-response';
import { WallHeader, WallBackground, WallCard } from '../models';



@Component({
	selector: 'app-media-wall',
	templateUrl: './media-wall.component.html',
	styleUrls: ['./media-wall.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public headerImageUrl = 'assets/images/cow_150x175.png';

	public query$: Observable<Query>;
	public apiWallResponseResults$: Observable<ApiResponseResult[]>;
	public isWallPaginating$: Observable<boolean>;
	public areWallResultsAvailable$: Observable<boolean>;
	public isWallSearching$: Observable<boolean>;
	public wallCustomHeader$: Observable<WallHeader>;
	public wallCustomCard$: Observable<WallCard>;
	public wallCustomBackground$: Observable<WallBackground>;
	public wallDisplayHeader$: Observable<boolean>;
	public wallHeaderTitle$: Observable<string>;
	public wallColumnCount$: Observable<string>;
	public wallCardStyle$: Observable<string>;

	public showToolBar = false;
	public showResults = false;
	public columnCount: string;
	public timer: Observable<any>;
	public masonryOptions: MasonryOptions = {
		itemSelector: '.brick',
		transitionDuration: '0.8s',
		resize: true,
		percentPosition: true
	}

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private elementRef: ElementRef,
		private store: Store<fromRoot.State>,
		private ref: ChangeDetectorRef,
		private dialog: MdDialog,
		private titleService: Title
	) { }

	ngOnInit() {
		this.queryFromURL();
		this.getDataFromStore();
		this.checkColumnCount();
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
			this.store.dispatch(new mediaWallAction.WallInputValueChangeAction(query));
		}
	}

	/**
	 * Getting the data(Observables) from store into the component.
	 */
	private getDataFromStore(): void {
		this.query$ = this.store.select(fromRoot.getMediaWallQuery);
		this.apiWallResponseResults$ = this.store.select(fromRoot.getMediaWallFilteredEntities);
		this.areWallResultsAvailable$ = this.store.select(fromRoot.getAreWallResultsAvailable);
		this.isWallPaginating$ = this.store.select(fromRoot.isWallPaginating);
		this.isWallSearching$ = this.store.select(fromRoot.getMediaWallLoading);
		this.wallCustomHeader$ = this.store.select(fromRoot.getMediaWallCustomHeader);
		this.wallCustomCard$ = this.store.select(fromRoot.getMediaWallCustomCard);
		this.wallCustomBackground$ = this.store.select(fromRoot.getMediaWallCustomBackground);
		this.wallCardStyle$ = this.store.select(fromRoot.getWallCardStyle);
		this.wallColumnCount$ = this.store.select(fromRoot.getWallColumnCount);
		this.wallDisplayHeader$ = this.store.select(fromRoot.getWallDisplayHeader);
		this.wallHeaderTitle$ = this.store.select(fromRoot.getWallHeaderTitle);
	}

	public openDialog(event) {
		if (event === 'Color') {
			this.dialog.open(MediaWallCustomizationComponent);
		}
		else if (event === 'Search') {
			this.dialog.open(MediaWallQueryComponent);
		}
		else if (event === 'Moderation') {
			this.dialog.open(MediaWallModerationComponent);
		}
		else if (event === 'Design') {
			this.dialog.open(MediaWallDesignComponent);
		}
	}

	public displayToolBar(event) {
		if (!this.showToolBar) {
			this.showToolBar = true;
			this.ref.markForCheck();
			this.timer = Observable.timer(8000);
			this.__subscriptions__.push(
				this.timer.subscribe(() => {
					this.showToolBar = false;
					this.ref.markForCheck();
				})
			);
		}
	}

	private checkColumnCount() {
		this.__subscriptions__.push(
			this.wallColumnCount$.subscribe((value) => {
				if (value !== '') {
					const intValue = parseInt(value, 10);
					const columnCountInt: number = 100 / intValue;
					this.columnCount = columnCountInt.toString() + '%';
				}
				else {
					this.columnCount = value;
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
