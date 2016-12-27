import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private __subscriptions__: Subscription[] = new Array<Subscription>();

	constructor (
		private store: Store<fromRoot.State> ,
		private router: Router
	) { }

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
