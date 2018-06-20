import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as mediaWallModerationAction from '../../actions/media-wall-moderation';
import * as mediaWallDirectUrlAction from '../../actions/media-wall-direct-url';
import { MasonryOptions } from '../../app-masonry';
import { WallCard } from '../../models';
import { ApiResponseResult } from '../../models/api-response';

@Component({
	selector: 'media-wall-moderation',
	templateUrl: './media-wall-moderation.component.html',
	styleUrls: ['./media-wall-moderation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaWallModerationComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();

	public apiWallResponseResults$: Observable<ApiResponseResult[]>;
	public areWallResultsAvailable$: Observable<boolean>;
	public getWallBlockedUsers$: Observable<string[]>;
	public getWallHiddenFeeds$: Observable<string[]>;
	public getWallProfanityCheck$: Observable<boolean>;
	public getWallRemoveDuplicate$: Observable<boolean>;

	public blockedUsers: string[];
	public hiddenIds: string[];
	public profanityCheck: boolean;
	public removeDuplicate: boolean;
	public masonryOptions: MasonryOptions = {
		transitionDuration: '0.8s'
	};
	public cardColor: WallCard = {
		fontColor: '#333333',
		backgroundColor: '#333333',
		accentColor: '#333333'
	};

	constructor(
		private dialogRef: MatDialogRef<MediaWallModerationComponent>,
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.dialogRef
			.updateSize('65%', '78%');
		this.getDataFromStore();
		this.checkData();
	}

	public profileName(userName): string {
		// The api's response.user.name has some errors for verified accounts and profile names with emojis.
		// It contains the an HTML part related to emojis in profile name.
		// So to handle such cases we take browser's help to remove such undesired strings.

		// HACK : To remove undesired string in profile name using browser.

		const html = userName;
		const div = document.createElement('div');
		div.innerHTML = html;
		const text = div.textContent || div.innerText || '';
		return text;
	}

	public itemText(feedText): string {
		// HACK : To remove undesired string in profile name using browser.

		const html = feedText;
		const div = document.createElement('div');
		div.innerHTML = html;
		const text = div.textContent || div.innerText || '';
		return text;
	}

	private getDataFromStore() {
		this.apiWallResponseResults$ = this.store.select(fromRoot.getMediaWallResponseEntities);
		this.areWallResultsAvailable$ = this.store.select(fromRoot.getAreWallResultsAvailable);
		this.getWallBlockedUsers$ = this.store.select(fromRoot.getMediaWallBlockedUser);
		this.getWallHiddenFeeds$ = this.store.select(fromRoot.getMediaWallHiddenId);
		this.getWallProfanityCheck$ = this.store.select(fromRoot.getMediaWallProfanityCheck);
		this.getWallRemoveDuplicate$ = this.store.select(fromRoot.getMediaWallDuplicateRemove);
	}

	public showRemoveFeed(id) {
		if (this.checkHidden(id)) {
			this.store.dispatch( new mediaWallModerationAction.WallShowFeedAction(id));
		} else {
			this.store.dispatch( new mediaWallModerationAction.WallHideFeedAction(id));
			this.store.dispatch( new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		}
	}

	public blockUnblockUser(user_id) {
		if (this.checkBlocked(user_id)) {
			this.store.dispatch( new mediaWallModerationAction.WallUnBlockUserAction(user_id));
			this.store.dispatch( new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		} else {
			this.store.dispatch( new mediaWallModerationAction.WallBlockUserAction(user_id));
			this.store.dispatch( new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
		}
	}

	public checkData() {
		this.__subscriptions__.push(
			this.getWallBlockedUsers$.subscribe((value) => {
				this.blockedUsers = value;
			}),
			this.getWallHiddenFeeds$.subscribe((value) => {
				this.hiddenIds = value;
			}),
			this.getWallProfanityCheck$.subscribe((value) => {
				this.profanityCheck = value;
			}),
			this.getWallRemoveDuplicate$.subscribe((value) => {
				this.removeDuplicate = value;
			})
		);
	}

	public checkHidden(id) {
		let flag = false;
		this.hiddenIds.forEach((value) => {
			if (value === id) {
				flag = true;
			}
		});
		return flag;
	}

	public checkBlocked(id) {
		let flag = false;
		this.blockedUsers.forEach((value) => {
			if (value === id) {
				flag = true;
			}
		});
		return flag;
	}

	public checkProfanity() {
		this.store.dispatch(new mediaWallModerationAction.WallProfanityChangeAction(this.profanityCheck));
		this.store.dispatch( new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
	}

	public checkDuplicate() {
		this.store.dispatch(new mediaWallModerationAction.WallRemoveDuplicateChangeAction(this.removeDuplicate));
		this.store.dispatch( new mediaWallDirectUrlAction.WallGenerateDirectUrlAction());
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
