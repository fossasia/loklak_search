import { Component, OnInit } from '@angular/core';
import * as titleAction from '../actions/title';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
	selector: 'app-privacy',
	templateUrl: './privacy.component.html',
	styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

	constructor( private store: Store<fromRoot.State> ) { }

	ngOnInit() {
		this.store.dispatch(new titleAction.SetTitleAction('Loklak Privacy Policy'));
	}

}
