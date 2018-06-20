import { ApiResponseResult } from '../models/api-response';

/**
 * @function profanityFilter
 * Takes feeds as an argument and return feeds without profanity
 *
 * @arg: feeds: Feeds to be filtered
 */
export function profanityFilter(feeds: ApiResponseResult[]): ApiResponseResult[] {
	const filteredFeeds: ApiResponseResult[] = [];
	feeds.forEach((feed) => {
		if ( feed.classifier_profanity !== null && feed.classifier_profanity !== undefined ) {
			if (feed.classifier_profanity !== 'sex' && feed.classifier_profanity !== 'swear') {
				filteredFeeds.push(feed);
			}
		} else {
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

export function accountExclusion(feeds: ApiResponseResult[], userId: string[] ): ApiResponseResult[] {
	const filteredFeeds: ApiResponseResult[] = [];
	let flag: boolean;
	feeds.forEach((feed) => {
		flag = false;
		userId.forEach((user) => {
			if (feed.user.user_id === user) {
				flag = true;
			}
		});
		if (!flag) {
			filteredFeeds.push(feed);
		}
	});

	return filteredFeeds || feeds;
}

export function hideFeed(feeds: ApiResponseResult[], statusId: string ): ApiResponseResult[] {
	const filteredFeeds: ApiResponseResult[] = [];
	feeds.forEach((feed) => {
		if (feed.id_str !== statusId) {
			filteredFeeds.push(feed);
		}
	});
	return filteredFeeds || feeds;
}

export function showFeed(originalFeeds: ApiResponseResult[], feeds: ApiResponseResult[], statusId: string ): ApiResponseResult[] {
	const newFeeds = [...feeds];
	originalFeeds.forEach((feed) => {
		if (feed.id_str === statusId) {
			newFeeds.push(feed);
		}
	});
	return newFeeds;
}

export function removeId(originalIds: string[], id: string ): ApiResponseResult[] {
	const newIds = [];
	originalIds.forEach((originalId) => {
		if (originalId !== id) {
			newIds.push(id);
		}
	});
	return newIds;
}

export function accountInclusion(
	originalFeeds: ApiResponseResult[],
	feeds: ApiResponseResult[],
	userId: string ): ApiResponseResult[] {
	const newFeeds = [...feeds];
	originalFeeds.forEach((feed) => {
		if (feed.user.user_id === userId) {
			newFeeds.push(feed);
		}
	});
	return newFeeds;
}

export function removeDuplicateCheck(feeds: ApiResponseResult[]): ApiResponseResult[] {
	const map = { };
	const filteredFeeds: ApiResponseResult[] = [];
	let v: string;
	for (let a = 0; a < feeds.length; a++) {
		v = feeds[a].id_str;
		if (!map[v]) {
			filteredFeeds.push(feeds[a]);
			map[v] = true;
		}
	}
	return filteredFeeds;
}
