export function generateDirectUrl(customization: any): string {
	const shortenedUrl = '';

	const activeFilterArray: string[] = new Array<string>();
	let qs = '';
	Object.keys(customization).forEach(config => {
		if (customization[config] !== undefined && customization[config] !== null) {
			if (config !== 'blockedUser' && config !== 'hiddenFeedId') {
				qs += `${config}=${encodeURIComponent(customization[config])}&`;
			}
			else {
				if (customization[config].length > 0) {
					qs += `${config}= ${encodeURIComponent(customization[config].join(','))}&`;
				}
			}
		}
	});
	qs += `ref=share`;
	return qs;
}
