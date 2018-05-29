import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallCustomAction from '../../actions/media-wall-custom';
import * as mediaWallDirectUrlAction from '../../actions/media-wall-direct-url';

import { WallHeader, WallBackground, WallCard } from '../../models';

@Component({
	selector: 'media-wall-customization',
	templateUrl: './media-wall-customization.component.html',
	styleUrls: ['./media-wall-customization.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallCustomizationComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public wallCustomHeader$: Observable<WallHeader>;
	public wallCustomCard$: Observable<WallCard>;
	public wallCustomBackground$: Observable<WallBackground>;

	constructor(
		private dialogRef: MatDialogRef<MediaWallCustomizationComponent>,
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.dialogRef
			.updateSize('65%', '78%');
		this.getDataFromStore();
		}

	private getDataFromStore() {
		this.wallCustomHeader$ = this.store.select(fromRoot.getMediaWallCustomHeader);
		this.wallCustomCard$ = this.store.select(fromRoot.getMediaWallCustomCard);
		this.wallCustomBackground$ = this.store.select(fromRoot.getMediaWallCustomBackground);
	}

	public customizeHeader(event) {
		this.store.dispatch(new mediaWallCustomAction.WallHeaderPropertiesChangeAction(event));
		this.store.dispatch(new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		this.dialogRef.close();
	}

	public customizeBackground(event) {
		this.store.dispatch(new mediaWallCustomAction.WallBackgroundPropertiesChangeAction(event));
		this.store.dispatch(new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		this.dialogRef.close();
	}

	public customizeCard(event) {
		this.store.dispatch(new mediaWallCustomAction.WallCardPropertiesChangeAction(event));
		this.store.dispatch(new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		this.dialogRef.close();
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}
