import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';



@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	public formcontrol = false;

	constructor( private titleService: Title) { }

	ngOnInit() {
		this.titleService.setTitle('Contact Loklak');
	}

	public contactform(event) {
		this.formcontrol = event;
	}
}
