import { Component, OnInit } from '@angular/core';
import * as titleAction from '../actions/title';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
	selector: 'app-pagenotfound',
	templateUrl: './pagenotfound.component.html',
	styleUrls: ['./pagenotfound.component.scss']
})
export class PageNotFoundComponent implements OnInit {
	public headerImageUrl = 'assets/images/cow_150x175.png';

	constructor( private store: Store<fromRoot.State> ) { }

	ngOnInit() {
		this.store.dispatch(new titleAction.SetTitleAction('404 Lokalak Search - Page Not Found'));
	}

}
