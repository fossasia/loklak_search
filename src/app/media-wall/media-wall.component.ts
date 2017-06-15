import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as mediaWallAction from '../actions/media-wall';

import { Query, ReloactionAfterQuery } from '../models/query';
import { ApiResponse, ApiResponseResult } from '../models/api-response';
import { MediaWallsColor } from '../models/media-wall';



@Component({
	selector: 'app-media-wall',
	templateUrl: './media-wall.component.html',
	styleUrls: ['./media-wall.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallComponent implements OnInit, AfterViewInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();

	public query$: Observable<Query>;
	public apiResponseResults$: Observable<ApiResponseResult[]>;
	public color$: Observable<MediaWallsColor>;
	public mediaElements$: Observable<string[]>;
	public setupMediaWall = false;

	constructor(
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.getDataFromStore();
	}

	ngAfterViewInit() {
	}

	/**
	 * Getting the data(Observables) from store into the component.
	 */
	private getDataFromStore(): void {
		this.query$ = this.store.select(fromRoot.getQuery);
		this.apiResponseResults$ = this.store.select(fromRoot.getApiResponseEntities);
		this.color$ = this.store.select(fromRoot.getMediaWallColor);
		this.mediaElements$ = this.store.select(fromRoot.getMediaElements);
	}

	private displayMediaWall(event) {
		this.setupMediaWall = event;
	}


	/**
	 * Clearup all the subscription when component is destroyed.
	 */
	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
