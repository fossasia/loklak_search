import { Component, OnInit, Input } from '@angular/core';
import { ApiResponseResult } from '../../shared/classes';
import {Observable} from 'rxjs/Rx';
@Component({
	selector: 'feed-card',
	templateUrl: './feed-card.component.html',
	styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
	 since=""; 
	@Input() private feedItem: ApiResponseResult;

	constructor() {}
	
	ngOnInit(){
	let timer = Observable.timer(0,10000);//interval setting
    timer.subscribe(t => this.ttt());
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

	private changeLinkUrls(match: any) {
		switch (match.getType()) {
			case 'hashtag': {
				return `<a href='/search?query=%23${match.getHashtag()}'>#${match.getHashtag()}</a>`;
			}
			case 'mention': { // tslint:disable-line
				return `<a href='/search?query=from%3A${match.getMention()}'>@${match.getMention()}</a>`;
			}
		}
	}

	private  ttt():any{
		this.since=this.tdiff();
	}

	private convertDateToUTC(date) {
	 	return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(),
		  date.getUTCMinutes(), date.getUTCSeconds()); }

	private  tdiff(): string {
	
	var createdadt=this.feedItem.created_at;
	var today=new Date().toISOString(); //current time  in ISO format
	var todaytime=new Date(today).getTime(); //current time in ms
	var tweetday=new Date(createdadt).toISOString(); //tweeted time  in TSO format
	var tweettime=new Date(tweetday).getTime();  //tweeted at in ms
	var tt=todaytime-tweettime;  //(current time-tweeted at) in ms
	var sinceMin=Math.floor(Math.abs((todaytime-tweettime))/60000);
	var now=(new Date()).getFullYear();
	var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
	var date2 = new Date(createdadt);
    if(sinceMin==0){
        var sinceSec=Math.round((todaytime-tweettime)/1000);
		if(sinceSec<=24){
			var since="now";
		}
		else{
			var since=sinceSec+"s";
		}
    }
    else if(sinceMin>=1&&sinceMin<60){
        var since=sinceMin+'m';
    }
	else if(sinceMin<1440){
        var sinceHr=Math.round(sinceMin/60);
      	var since=sinceHr+'h';
	}
    else if(date2.getFullYear()==now){
		var since= months[date2.getMonth()] +' '+date2.getDate()  ;
	}
	else{
		var since= date2.getDate()+' '+months[date2.getMonth()]+' '+date2.getFullYear()  ;
	}
    return since;
	}


}



