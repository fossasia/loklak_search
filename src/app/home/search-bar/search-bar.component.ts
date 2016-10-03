import { Component, OnInit } from '@angular/core';
import { SearchModel } from '../../shared/classes';

@Component({
	selector: 'home-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	private searchModel = new SearchModel();
	public submitted: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	get queryJSON() {
		return JSON.stringify(this.searchModel);
	}
}
