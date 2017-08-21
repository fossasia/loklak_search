import {
	Component,
	Input,
	OnInit,
	OnChanges,
	SimpleChanges,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';

import { ApiResponseAggregations, UserApiResponse } from '../../models';
import * as fromRoot from '../../reducers';

interface Aggregation {
	key: string;
	value: number;
}

@Component({
	selector: 'feed-info-box',
	templateUrl: './feed-info-box.component.html',
	styleUrls: ['./feed-info-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedInfoBoxComponent implements OnInit, OnChanges {
	@Input() public apiResponseAggregations: ApiResponseAggregations;
	@Input() public userCard: boolean;
	@Input() public apiResponseUser: UserApiResponse;
	@Input() public apiResponseUserFollowing: UserApiResponse[];
	@Input() public apiResponseUserFollowers: UserApiResponse[];
	public aggregatedHashtags: Aggregation[] = [];
	public aggregatedMentions: Aggregation[] = [];
	public aggregatedScreenName: Aggregation[] = [];

	constructor(
		private changeDetectorRef: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.changeDetectorRef.detectChanges();
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
		if (changes.apiResponseAggregations &&
				changes.apiResponseAggregations.currentValue !== changes.apiResponseAggregations.previousValue) {
			this.updateAggregations();
		}
	}

	public updateAggregations() {
		if (this.apiResponseAggregations) {

			// For Hashtags
			if (this.apiResponseAggregations.hashtags) {
				const hashtagAggregations: Aggregation[] = [];
				Object.keys(this.apiResponseAggregations.hashtags).forEach(key => {
					const aggregationObject: Aggregation = {
						key,
						value: this.apiResponseAggregations.hashtags[key]
					};
					hashtagAggregations.push(aggregationObject);
				});
				this.aggregatedHashtags = hashtagAggregations;
			} else {
				this.aggregatedHashtags = [];
			}

			// For Mentions
			if (this.apiResponseAggregations.mentions) {
				const mentionAggregations: Aggregation[] = [];
				Object.keys(this.apiResponseAggregations.mentions).forEach(key => {
					const aggregationObject: Aggregation = {
						key,
						value: this.apiResponseAggregations.mentions[key]
					};
					mentionAggregations.push(aggregationObject);
				});
				this.aggregatedMentions = mentionAggregations;
			} else {
				this.aggregatedMentions = [];
			}

			// For Screen Names
			if (this.apiResponseAggregations.screen_name) {
				const screenNameAggregations: Aggregation[] = [];
				Object.keys(this.apiResponseAggregations.screen_name).forEach(key => {
					const aggregationObject: Aggregation = {
						key,
						value: this.apiResponseAggregations.screen_name[key]
					};
					screenNameAggregations.push(aggregationObject);
				});
				this.aggregatedScreenName = screenNameAggregations;
			} else {
				this.aggregatedScreenName = [];
			}
		} else {
			this.aggregatedHashtags = [];
			this.aggregatedMentions = [];
			this.aggregatedScreenName = [];
		}
	}

	// The Loklak API is returning only the normal version of the profile image
	// So to make the bigger (73x73) version to be used we do this conversion.
	public get profileImageSrc(): string {
		return this.apiResponseUser.profile_image_url.split('_normal').join('_bigger');
	}
}
