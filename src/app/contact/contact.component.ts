import { Component, OnInit } from '@angular/core';

interface Issue {
	name: string;
	email: string;
	input: string;
}

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	showLightbox: boolean = null;
	public issue: Issue;
	showsend: boolean = true;
	constructor() { }

	ngOnInit() {
		this.issue = {
			name: '',
			email: '',
			input: ''
		};
	}

	showcontactform() {
		if (this.showLightbox) {
			return 'visible';
		} else {
			return '';
		}
	}

	OnSubmit(model: Issue) {
		// dosomething
	}

}
