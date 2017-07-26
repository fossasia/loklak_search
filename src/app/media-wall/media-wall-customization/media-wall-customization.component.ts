import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallCustomAction from '../../actions/media-wall-custom';

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
		private dialogRef: MdDialogRef<MediaWallCustomizationComponent>,
		private store: Store<fromRoot.State>,
		private location: Location,
		private ref: ChangeDetectorRef) { }

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
		this.dialogRef.close();
	}

	public customizeBackground(event) {
		this.store.dispatch(new mediaWallCustomAction.WallBackgroundPropertiesChangeAction(event));
		this.dialogRef.close();
	}

	public customizeCard(event) {
		this.store.dispatch(new mediaWallCustomAction.WallCardPropertiesChangeAction(event));
		this.dialogRef.close();
	}

		ngOnDestroy() {
			this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
		}
}
