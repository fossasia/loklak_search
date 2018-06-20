import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallQueryAction from '../../actions/media-wall-query';
import { Query } from '../../models';

@Component({
	selector: 'media-wall-query',
	templateUrl: './media-wall-query.component.html',
	styleUrls: ['./media-wall-query.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallQueryComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public query$: Observable<Query>;
	public searchQuery = '';
	public place = '';
	public imageOnly = false;
	public query: Query = {
		displayString: '',
		queryString: '',
		routerString: '',
		filter: {
			video: false,
			image: false
		},
		location: null,
		timeBound: {
			since: null,
			until: null
		},
		from: false
	};

	constructor(
		private dialogRef: MatDialogRef<MediaWallQueryComponent>,
		private store: Store<fromRoot.State>
	) { }

	ngOnInit() {
		this.dialogRef
			.updateSize('67%', '78%');
		this.getDataFromStore();
		this.checkData();
		}

		private getDataFromStore() {
		this.query$ = this.store.select(fromRoot.getMediaWallQuery);
	}

	public search() {
		const requestQuery: Query = {
			displayString: this.searchQuery,
			queryString: '',
			routerString: this.searchQuery,
			filter: {
				video: false,
				image: this.imageOnly
			},
			location: this.place,
			timeBound: {
				since: null,
				until: null
			},
			from: false
		};
			this.store.dispatch(new mediaWallQueryAction.WallQueryChangeAction(requestQuery));
			this.dialogRef.close();
	}

	private checkData() {
		this.__subscriptions__.push(
			this.query$.subscribe((value) => {
				this.searchQuery = value.displayString;
				this.place = value.location;
				this.imageOnly = value.filter.image;
			})
		);
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
