import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallCustomAction from '../../actions/media-wall-custom';
import * as mediaWallAction from '../../actions/media-wall-query';

import { WallCard } from '../../models';

@Component({
	selector: 'media-wall-menu',
	templateUrl: './media-wall-menu.component.html',
	styleUrls: ['./media-wall-menu.component.scss']
})
export class MediaWallMenuComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public wallCustomCard$: Observable<WallCard>;
	@Input() query: string;
	public initialized = false;
	public menuActive = false;
	public searchInputControl = new FormControl();
	@Input() showHideMenu: boolean;
	@Output() showHideCustomization: EventEmitter<string> = new EventEmitter<string>();
	public currentTheme: string;
	public themes = [ '#FFFFFF', '#333' ];

	constructor(
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.getDataFromStore();
		this.checkTheme();
		this.setupSearchField();
	}

	public installTheme() {
		if (this.currentTheme === this.themes[0]) {
			this.store.dispatch( new mediaWallCustomAction.WallLightThemeChangeAction(''));
		}
		else if (this.currentTheme === this.themes[1]) {
			this.store.dispatch( new mediaWallCustomAction.WallDarkThemeChangeAction(''));
		}
	}

	private setupSearchField(): void {
		this.__subscriptions__.push(
			this.searchInputControl
					.valueChanges
					.subscribe(queryString => {
						if (this.query !== queryString || this.initialized) {
							this.relocateEvent(queryString);
						}
						this.initialized = true;
					})
		);
	}

	public getDataFromStore() {
		this.wallCustomCard$ = this.store.select(fromRoot.getMediaWallCustomCard);
	}

	public checkTheme() {
		this.__subscriptions__.push(
			this.wallCustomCard$.subscribe((value) => {
				if (value.fontColor === '#333') {
					this.currentTheme = this.themes[0];
				}
				else if (value.fontColor === '#FFFFFF') {
					this.currentTheme = this.themes[1];
				}
			})
		)
	}

	public relocateEvent(event) {
		this.store.dispatch(new mediaWallAction.WallInputValueChangeAction(event));
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
