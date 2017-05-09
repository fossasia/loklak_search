import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pagenotfound',
	templateUrl: './pagenotfound.component.html',
	styleUrls: ['./pagenotfound.component.scss']
})
export class PageNotFoundComponent implements OnInit {
	public headerImageUrl = 'assets/images/cow_150x175.png';

	constructor() { }

	ngOnInit() {
	}

}
