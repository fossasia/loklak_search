import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	public formcontrol = false;

	constructor() { }

	ngOnInit() {
	}

	private contactform(event) {
		this.formcontrol = event;
	}
}
