import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'feed-card',
	templateUrl: './feed-card.component.html',
	styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
	@Input() private feedItem: any; // Temporarily as a JSON in future it will be a model object

	constructor() { }

	ngOnInit() { }

	private get profileURL(): string {
		return `https://twitter.com/${this.feedItem.screen_name}/`;
	}

	private get profileName(): string {
		// The api's response.user.name has some errors for verified accounts and profile names with emojis.
		// It contains the an HTML part related to emojis in profile name.
		// So to handle such cases we take browser's help to remove such undesired strings.

		// HACK : To remove undesired string in profile name using browser.

		let html = this.feedItem.user.name;
		let div = document.createElement('div');
		div.innerHTML = html;
		let text = div.textContent || div.innerText || '';
		return text;
	}

	private get itemText(): string {
		// HACK : To remove undesired string in profile name using browser.

		let html = this.feedItem.text;
		let div = document.createElement('div');
		div.innerHTML = html;
		let text = div.textContent || div.innerText || '';
		return text;
	}

	private get retweetCount(): string {
		let retweets = this.feedItem.retweet_count;

		return (retweets === 0) ? '' : retweets.toString();
	}

	private get favoriteCount(): string {
		let favourites = this.feedItem.favourites_count;

		return (favourites === 0) ? '' : favourites.toString();
	}
}
