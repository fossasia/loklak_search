import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor (
		private store: Store<fromRoot.State>
	) { }
}
