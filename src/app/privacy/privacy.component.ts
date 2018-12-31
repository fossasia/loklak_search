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

	scrollTo(el) {
		const element = document.getElementById(el);
		document.getElementsByClassName('active')[0].classList.remove('active');
		document.getElementsByClassName(el)[0].classList.add('active');
		const headerOffset = 75;
		const elementPosition = element.offsetTop;
		const offsetPosition = elementPosition - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
}
