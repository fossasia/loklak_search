import { Component, OnInit, HostListener } from '@angular/core';
import * as titleAction from '../actions/title';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
	selector: 'app-terms',
	templateUrl: './terms.component.html',
	styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

	public navIsFixed: boolean;
	constructor( private store: Store<fromRoot.State> ) { }

	ngOnInit() {
		this.store.dispatch(new titleAction.SetTitleAction('Loklak Terms of Service'));
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
