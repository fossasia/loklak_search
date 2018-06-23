import { Component, OnInit } from '@angular/core';
import * as titleAction from '../actions/title';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	public formcontrol = false;

	constructor( private store: Store<fromRoot.State> ) { }

	ngOnInit() {
		this.store.dispatch(new titleAction.SetTitleAction('Contact Loklak'));
	}

	public contactform(event) {
		this.formcontrol = event;
	}
}
