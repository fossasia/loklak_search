import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallDesignAction from '../../actions/media-wall-design';
import * as mediaWallDirectUrlAction from '../../actions/media-wall-direct-url';

import { WallHeader, WallBackground, WallCard } from '../../models';

@Component({
	selector: 'media-wall-design',
	templateUrl: './media-wall-design.component.html',
	styleUrls: ['./media-wall-design.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallDesignComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public showHideHeaderValue: boolean;
	public headerTitle: string;
	public selectedColumnCount: string;
	public selectedFeedsCount: string;
	public selectedCardStyle: string;
	public wallDisplayHeader$: Observable<boolean>;
	public wallHeaderTitle$: Observable<string>;
	public wallColumnCount$: Observable<string>;
	public wallCardStyle$: Observable<string>;
	public wallFeedsCount$: Observable<number>;

constructor(
		private dialogRef: MatDialogRef<MediaWallDesignComponent>,
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.dialogRef
			.updateSize('65%', '80%');
		this.getDataFromStore();
		this.checkDisplayHeader();
		}

	private getDataFromStore() {
		this.wallDisplayHeader$ = this.store.select(fromRoot.getWallDisplayHeader);
		this.wallHeaderTitle$ = this.store.select(fromRoot.getWallHeaderTitle);
		this.wallColumnCount$ = this.store.select(fromRoot.getWallColumnCount);
		this.wallFeedsCount$ = this.store.select(fromRoot.getWallCount);
		this.wallCardStyle$ = this.store.select(fromRoot.getWallCardStyle);
	}

	public showHideHeader(event) {
		this.showHideHeaderValue = !(this.showHideHeaderValue);
	}

	public checkDisplayHeader() {
		this.__subscriptions__.push(
			this.wallDisplayHeader$.subscribe((value) => {
				this.showHideHeaderValue = value;
			}),
			this.wallHeaderTitle$.subscribe((value) => {
				this.headerTitle = value;
			}),
			this.wallColumnCount$.subscribe((value) => {
				if (value === '') {
					this.selectedColumnCount = 'Automatic';
				} else {
					this.selectedColumnCount = value;
				}
			}),
			this.wallFeedsCount$.subscribe((value) => {
				this.selectedFeedsCount = value.toString();
			}),
			this.wallCardStyle$.subscribe((value) => {
				this.selectedCardStyle = value;
			})
		);
	}

	public change() {
		if (this.selectedColumnCount === 'Automatic') {
			this.selectedColumnCount = '';
		}
		this.store.dispatch(new mediaWallDesignAction.WallDisplayHeaderAction(this.showHideHeaderValue));
		this.store.dispatch(new mediaWallDesignAction.WallCardStyleChangeAction(this.selectedCardStyle));
		this.store.dispatch(new mediaWallDesignAction.WallCountChangeAction(this.selectedFeedsCount));
		this.store.dispatch(new mediaWallDesignAction.WallColumnCountChangeAction(this.selectedColumnCount));
		this.store.dispatch(new mediaWallDesignAction.WallHeaderTitleChangeAction(this.headerTitle));
		this.store.dispatch(new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		this.dialogRef.close();
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
