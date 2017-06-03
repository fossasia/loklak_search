import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ApiResponseResult } from '../../models/api-response';
import { Observable } from 'rxjs/Rx';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'feed-card',
	templateUrl: './feed-card.component.html',
	styleUrls: ['./feed-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent implements OnInit {
	public datetime: string = null;
	public inviewport: Observable<boolean>;
	@Input() feedItem: ApiResponseResult;
	@Input() feedIndex: number;
	@Output() showLightBox: EventEmitter<any> = new EventEmitter();

	constructor(private ref: ChangeDetectorRef,
		private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
		const timer = Observable.timer(0, 10000);
		timer.subscribe(t => this.ttt());
		this.imageURLs(this.feedItem.images);
		this.sanitizeAndEmbedURLs(this.feedItem.videos);
	}

	onShowed(show: boolean) {
		if (show) {
			this.showLightBox.emit({ show: 'hide' });
		}
	}

	showHideLightbox(link: string) {
		window.open(link, '_blank');
		this.onShowed(true);
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

	public ttt(): any {
		this.datetime = this.tdiff();
		this.ref.markForCheck();
	}


	private tdiff(): string {
		let since: string = null;
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
				since = 'now';
			}
			else {
				since = sinceSec + 's';
			}
		}
		else if (sinceMin >= 1 && sinceMin < 60) {
			since = sinceMin + 'm';
		}
		else if (sinceMin < 1440) {
			const sinceHr = Math.round(sinceMin / 60);
			since = sinceHr + 'h ago';
		}
		else if (date2.getFullYear() === now) {
			since = months[date2.getMonth()] + ' ' + date2.getDate();
		}
		else {
			since = date2.getDate() + ' ' + months[date2.getMonth()] + ' ' + date2.getFullYear();
		}

		return since;
	}

	public inview(event) {
		if (event.value === true) {
			this.inviewport = event.value;
		}
	}

	private sanitizeAndEmbedURLs(links) {
		links.forEach((link, i) => {
			const videoid = links[i].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
			if (videoid !== null) {
				links[i] = 'http://www.youtube.com/embed/' + videoid[1];
			}
			links[i] = this.sanitizer.bypassSecurityTrustResourceUrl(links[i]);
		});
	}

	private imageURLs(links) {
		const img1 = new RegExp('https:\\/\\/abs\\.twimg\\.com\\/');
		const img2 = new RegExp('https:\\/\\/pic\\.twitter\\.com\\/');
		const img3 = new RegExp('https:\\/\\/www\\.instagram\\.com\\/');
		const imgarr = [];
		links.forEach((link, i) => {
			const res1 = img1.exec(link);
			const res2 = img2.exec(link);
			const res3 = img3.exec(link);
			if (res1 === null && res2 === null && res3 === null) {
				imgarr.push(link);
			}
		});
		this.feedItem.images = imgarr;
	}
}
