import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiResponseResult } from '../../models/api-response';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'feed-lightbox',
	templateUrl: './feed-lightbox.component.html',
	styleUrls: ['./feed-lightbox.component.scss'],
})
export class FeedLightboxComponent implements OnInit {
	public datetime: string = null;
	@Input() feedItem: ApiResponseResult;
	@Output() hideLightBox: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		const timer = Observable.timer (0 , 10000);
		timer.subscribe(t => this.ttt());
	}

	public get profileURL(): string {
		return `https://twitter.com/${this.feedItem.screen_name}/`;
	}

	public get profileName(): string {
		// The api's response.user.name has some errors for verified accounts and profile names with emojis.
		// It contains the an HTML part related to emojis in profile name.
		// So to handle such cases we take browser's help to remove such undesired strings.

		// HACK : To remove undesired string in profile name using browser.

		const html = this.feedItem.user.name;
		const div = document.createElement('div');
		div.innerHTML = html;
		const text = div.textContent || div.innerText || '';
		return text;
	}

	public onShowed(event) {
		this.hideLightBox.emit();
	}

	public get itemText(): string {
		// HACK : To remove undesired string in profile name using browser.

		const html = this.feedItem.text;
		const div = document.createElement('div');
		div.innerHTML = html;
		const text = div.textContent || div.innerText || '';
		return text;
	}

	public get retweetCount(): string {
		const retweets = this.feedItem.retweet_count;

		return (retweets === 0) ? '' : retweets.toString();
	}

	public get favoriteCount(): string {
		const favourites = this.feedItem.favourites_count;

		return (favourites === 0) ? '' : favourites.toString();
	}

	private  ttt(): any {
		this.datetime = this.tdiff();
	}


	private tdiff(): string {
		let since: string = null ;
		const createdadt = this.feedItem.created_at;
		const today = new Date().toISOString();  // current time  in ISO format
		const todaytime = new Date(today).getTime();  // current time in ms
		const tweetday = new Date(createdadt).toISOString(); // tweeted time  in TSO format
		const tweettime = new Date(tweetday).getTime();  // tweeted at in ms
		const tt = todaytime - tweettime;  // (current time-tweeted at) in ms
		const sinceMin = Math.floor(Math.abs((todaytime - tweettime)) / 60000);
		const now = (new Date()).getFullYear();
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const date2 = new Date(createdadt);

		if (sinceMin === 0) {
			const sinceSec = Math.round((todaytime - tweettime) / 1000);
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
		const sinceHr = Math.round(sinceMin / 60);
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
