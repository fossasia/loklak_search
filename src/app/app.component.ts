import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SpeechService } from './services/speech.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private __subscriptions__: Subscription[] = new Array<Subscription>();
	public _queryControl: FormControl = new FormControl();
	hidespeech: Observable<any>;
	completeQuery$: Observable<any>;
	searchData: String;

	constructor (
		private store: Store<fromRoot.State>,
		private router: Router,
		private speech: SpeechService
	) {
		this.hidespeech = store.select(fromRoot.getspeechStatus);
		this.hidespeech.subscribe(hidespeech => {
			if (!hidespeech) {
				this.speech.stoprecord();
			}
		});

		this.completeQuery$ = store.select(fromRoot.getQuery);

		this.completeQuery$.subscribe(data => {
			this.searchData = data;
		});
	}

	ngOnInit() {
		this.__subscriptions__.push(
			this.router.events
				.subscribe((val: NavigationEnd ) => {
						if (val instanceof NavigationEnd) {
							window.scrollTo(0, 0);
						}
				})
		);
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}

}
