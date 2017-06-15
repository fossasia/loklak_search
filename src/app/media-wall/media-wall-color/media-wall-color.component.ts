import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import * as mediaWallAction from '../../actions/media-wall';
import { MediaWallsColor } from '../../models/media-wall';

@Component({
	selector: 'media-wall-color',
	templateUrl: './media-wall-color.component.html',
	styleUrls: ['./media-wall-color.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallColorComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	@Input() color: MediaWallsColor;
	@Output() loadMediaWall: EventEmitter<boolean> = new EventEmitter<boolean>();
	public colorInputControl_accent = new FormControl();
	public colorInputControl_text = new FormControl();
	public colorInputControl_background = new FormControl();

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.setupSearchField();
	}

	private setupSearchField(): void {
		this.__subscriptions__.push(
			this.colorInputControl_accent
					.valueChanges
					.subscribe(value => {
						this.store.dispatch(new mediaWallAction.NewAccentColorAction(value));
					}),
			this.colorInputControl_text
					.valueChanges
					.subscribe(value => {
						this.store.dispatch(new mediaWallAction.NewTextColorAction(value));
					}),
			this.colorInputControl_background
					.valueChanges
					.subscribe(value => {
						this.store.dispatch(new mediaWallAction.NewBackgroundColorAction(value));
					})
		);
	}

	ngOnDestroy() {
			this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
		}

}
