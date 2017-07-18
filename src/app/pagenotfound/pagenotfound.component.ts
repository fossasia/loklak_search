import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-pagenotfound',
	templateUrl: './pagenotfound.component.html',
	styleUrls: ['./pagenotfound.component.scss']
})
export class PageNotFoundComponent implements OnInit {
	public headerImageUrl = 'assets/images/cow_150x175.png';

	constructor(
		private titleService: Title
	) { }

	ngOnInit() {
		this.titleService.setTitle('404 Lokalak Search - Page Not Found');
	}

}
