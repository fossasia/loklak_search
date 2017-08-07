import { ApiResponseResult } from '../models/api-response';
import { cut } from './array';

/**
 * @function profanityFilter
 * Takes feeds as an argument and return feeds without profanity
 *
 * @arg: feeds: Feeds to be filtered
 */
export function profanityFilter(feeds: ApiResponseResult[]): ApiResponseResult[] {
	const filteredFeeds: ApiResponseResult[] = [];
	feeds.forEach((feed) => {
		if ( feed.classifier_language !== null && feed.classifier_profanity !== undefined ) {
				if (feed.classifier_profanity !== 'sex' && feed.classifier_profanity !== 'swear') {
					filteredFeeds.push(feed);
				}
			}
			else {
				filteredFeeds.push(feed);
			}
	});
	return filteredFeeds || feeds;
}

/**
 * @function accountExclusion
 * Takes feeds and user screen names as an argument and return feeds
 * excluding from the accounts mentioned
 *
 * @arg: feeds: Feeds to be filtered
 * @arg: userNameString: Users to be excluded as a string
 */

export function accountExclusion(feeds: ApiResponseResult[], userNamesString: string ): ApiResponseResult[] {
	const filteredFeeds: ApiResponseResult[] = [];
	const userName = cut(userNamesString, ',').split('');
	let flag: boolean;
	feeds.forEach((feed) => {
		flag = false;
		userName.forEach((user) => {
			if (feed.user.screen_name === user) {
				flag = true;
			}
		});
		if (!flag) {
			filteredFeeds.push(feed);
		}
	});

	return filteredFeeds || feeds;
}
