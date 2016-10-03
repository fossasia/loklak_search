import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private header: string = 'Loklak Search!';
	private headerImageUrl: string = 'assets/images/cow_150x175.png';

	constructor() { }

	ngOnInit() {
	}

}
