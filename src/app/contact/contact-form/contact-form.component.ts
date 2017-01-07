import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { countrycodearray } from '../../shared/countrycode/countrycode';

interface User {
	name: string;
	email: string;
	countrycode: number;
	telephone: number;
	message: string;
}

@Component({
	selector: 'contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	private ContactForm: FormGroup;
	private submitted: boolean = false;
	private selectedValue = null;
	private countries = countrycodearray;
	@Output() private hidecontactform: EventEmitter<any> = new EventEmitter();

	constructor( private http: Http ) { }

	ngOnInit() {
		this.ContactForm = new FormGroup({
			name: new FormControl('', [<any>Validators.required]),
			email: new FormControl('', [<any>Validators.required]),
			countrycode: new FormControl('213', [<any>Validators.required]),
			telephone: new FormControl('', [<any>Validators.required]),
			message: new FormControl('', [<any>Validators.required, <any>Validators.minLength(200)])
			});
	}

	private sendtosuperuser(User) {
		let headers = new Headers();
		let formObj = User.getRawValue();
		let data = JSON.stringify(formObj);


		headers.append('Content-Type', 'application/X-www-form-urlencoded');
		headers.append('Accept', 'application/json');

		this.http.post('https://formspree.io/gr8achint.sharma@gmail.com', data, {headers: headers})
			.subscribe((response) => {
				if (response.json().success) {
					this.http.post('https://formspree.io/gr8achint.sharma@gmail.com', data, {headers: headers})
						.subscribe((responsesent) => {
							if (responsesent.json().success) {
								console.log('Sent successfully');
							}
						});
				}
			});
		}


	private showsubmit() {
		this.submitted = true;
	}

}
