export function removeDuplicate(feeds: any[], testFeeds: any[]): any[] {
	const filteredFeeds: any[] = [];
	let flag = false;
	testFeeds.forEach((testFeed) => {
		feeds.forEach((feed) => {
			if (feed.id_str === testFeed.id_str) {
					flag = true;
			}
		})
		if (!flag) {
			filteredFeeds.push(testFeed);
		}
	});
	return filteredFeeds || testFeeds;
}
