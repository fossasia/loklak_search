import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as queryAction from '../actions/query';
import * as suggestAction from '../actions/suggest';
import { SpeechService } from '../services/speech.service';
import * as speechactions from '../actions/speech';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import * as fromRoot from '../reducers';

@Component({
	selector: 'app-speech',
	templateUrl: './speech.component.html',
	styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit {

	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public _queryControl: FormControl = new FormControl();
	message: any = 'Speak now';
	ticks: any = 0;
	timer: any;
	subscription: any;
	change = false;
	borderheight = 0;
	borderwidth = 0;
	buttoncolor = '#fff';
	miccolor = '#f44';
	resultspage: boolean;
	shadowleft: any = '-69px';
	shadowtop: any = '-68px';

	constructor(
		private speech: SpeechService,
		private store: Store<fromRoot.State>,
		private router: Router
	) {
		this.resultspage = this.router.url.toString().includes('/search');
		if (this.resultspage) {
			this.shadowleft = '-103px';
			this.shadowtop = '-102px';
		}
		this.speechRecognition();
	}

	speechRecognition() {
		this.speech.record('en_US').subscribe(voice => this.onquery(voice));
	}

	onquery(event: any) {
		this.resettimer();
		this.router.navigate([`/search`], { queryParams: { query: event }, skipLocationChange: true } );
		this.message = event;
		const instantsearch = JSON.parse(localStorage.getItem('instantsearch'));
		if (instantsearch && instantsearch.value) {
			this.router.navigate([`/search`], { queryParams: { query: event }, skipLocationChange: true } );
		}
	}

	hidespeech() {
		this.store.dispatch(new speechactions.SearchAction(false));
	}

	randomize(min, max) {
		let x;
		x = (Math.random() * (max - min) + min);
		return x;
	}

	resettimer(recheck: boolean = false) {
		this.subscription.unsubscribe();
		this.timer = timer(0, 100);
		this.subscription = this.timer.subscribe(t => {
		this.ticks = t;
			if (t % 10 === 0 && t <= 20) {
				this.buttoncolor = '#f44';
				this.miccolor = '#fff';
				this.borderheight = this.randomize(0.7, 1);

				if (this.resultspage) {
					this.borderheight = this.randomize(0.35, 0.5);
				}

				if (!recheck) {
					this.resettimer(true);
				}
			}

			if (t === 20) {
				this.borderheight = 0;
			}

			if (t === 30) {
				this.subscription.unsubscribe();
				this.store.dispatch(new speechactions.SearchAction(false));
			}
		});
	}

	ngOnInit() {
		this.timer = timer(1500, 2000);
		this.subscription = this.timer.subscribe(t => {
			this.ticks = t;

			if (t === 1) {
				this.message = 'Listening...';
			}

			if (t === 4) {
				this.message = 'Please check your microphone and volume levels.';
				this.miccolor = '#C2C2C2';
			}

			if (t === 6) {
				this.subscription.unsubscribe();
				this.store.dispatch(new speechactions.SearchAction(false));
			}
		});
	}
}
