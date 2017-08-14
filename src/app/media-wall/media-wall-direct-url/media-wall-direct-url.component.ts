import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallCustomAction from '../../actions/media-wall-custom';

import { WallHeader, WallBackground, WallCard } from '../../models';

@Component({
	selector: 'media-wall-direct-url',
	templateUrl: './media-wall-direct-url.component.html',
	styleUrls: ['./media-wall-direct-url.component.scss']
})
export class MediaWallDirectUrlComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public directUrl$: Observable<string>;

	constructor(
		private dialogRef: MdDialogRef<MediaWallDirectUrlComponent>,
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.dialogRef
			.updateSize('45%', '45%');
		this.getDataFromStore();
		}

	private getDataFromStore() {
		this.directUrl$ = this.store.select(fromRoot.getMediaWallDirectUrl);
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}

