import { Component, OnInit } from '@angular/core';
import { defaultUrlConfig } from '../shared/url-config';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	public configUrl = defaultUrlConfig;

	constructor() { }

	ngOnInit() { }

}
