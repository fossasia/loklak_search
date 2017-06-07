import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-terms',
	templateUrl: './terms.component.html',
	styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

	constructor( private titleService: Title) { }

	ngOnInit() {
		this.titleService.setTitle('Loklak Terms of Service');
	}

}
