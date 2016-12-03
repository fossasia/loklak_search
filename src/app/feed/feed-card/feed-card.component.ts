import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseResult } from '../../shared/classes';
import { Observable } from 'rxjs/Rx';

import { AutolinkerConfig, ConfigLinkType } from '../../shared/configrations';

@Component({
	selector: 'feed-card',
	templateUrl: './feed-card.component.html',
	styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
	private readonly cardAutolinkerConfig: AutolinkerConfig = new AutolinkerConfig();
	private datetime: string = null;
	@Input() private feedItem: ApiResponseResult;

	constructor() { }

	ngOnInit() {
		this.modifyAutolinkerConfig();
		let timer = Observable.timer (0 , 10000);
		timer.subscribe(t => this.ttt());
	}

	private modifyAutolinkerConfig() {
		// hashtag and mention use the default configration strategy.
		// Links use the one-to-one map strategy using unshorten property of feedItem
		this.cardAutolinkerConfig.link.link_type = ConfigLinkType.OneToOneMap;
		this.cardAutolinkerConfig.link.link_to = this.feedItem.unshorten;
	}

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

	private  ttt(): any {
		this.datetime = this.tdiff();
	}


	private tdiff(): string {
		let since: string = null ;
		let createdadt = this.feedItem.created_at;
		let today = new Date().toISOString();  // current time  in ISO format
		let todaytime = new Date(today).getTime();  // current time in ms
		let tweetday = new Date(createdadt).toISOString(); // tweeted time  in TSO format
		let tweettime = new Date(tweetday).getTime();  // tweeted at in ms
		let tt = todaytime - tweettime;  // (current time-tweeted at) in ms
		let sinceMin = Math.floor(Math.abs((todaytime - tweettime)) / 60000);
		let now = (new Date()).getFullYear();
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let date2 = new Date(createdadt);

		if (sinceMin === 0) {
			let sinceSec = Math.round((todaytime - tweettime) / 1000);
			if (sinceSec <= 24) {
			since = 'now' ;
			}
			else {
				since = sinceSec + 's' ;
			}
		}
		else if (sinceMin >= 1 && sinceMin < 60) {
		since = sinceMin + 'm' ;
		}
		else if (sinceMin < 1440) {
		let sinceHr = Math.round(sinceMin / 60);
		since = sinceHr + 'h' ;
		}
		else if (date2.getFullYear() === now) {
			since = months[date2.getMonth()] + ' ' + date2.getDate()  ;
		}
		else {
			since = date2.getDate() + ' ' + months[date2.getMonth()] + ' ' + date2.getFullYear()  ;
		}

		return since;
	}
}



