import { Component, OnInit, Input } from '@angular/core';
import { UserApiResponse } from '../../models/api-user-response';
import { immutableSort } from '../../utils';

@Component({
	selector: 'user-info-box',
	templateUrl: './user-info-box.component.html',
	styleUrls: ['./user-info-box.component.scss']
})
export class UserInfoBoxComponent implements OnInit {
	@Input() apiResponseUser: UserApiResponse;
	@Input() apiResponseUserFollowing: Array<UserApiResponse>;
	@Input() apiResponseUserFollowers: Array<UserApiResponse>;
	@Input() isUserResponseLoading: boolean;

	public sortedApiResponseUserFollowing: Array<UserApiResponse>;
	public sortedApiResponseUserFollowers: Array<UserApiResponse>;

	constructor() { }

	ngOnInit() {
		this.sortedApiResponseUserFollowing = immutableSort(this.apiResponseUserFollowing, this.compareUsers);
		this.sortedApiResponseUserFollowers = immutableSort(this.apiResponseUserFollowers, this.compareUsers);
	}

	private compareUsers(user1: UserApiResponse, user2: UserApiResponse): number {
		const follower_count_diff: number = user1.followers_count - user2.followers_count;
		const statuses_count_diff: number = user1.statuses_count - user2.statuses_count;

		if (follower_count_diff) {
			return follower_count_diff;
		} else if (statuses_count_diff) {
			return statuses_count_diff;
		} else {
			return 0;
		}
	}
}
