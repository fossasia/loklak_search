import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
	public contactForm: FormGroup;
	public submitted = false;
	public selectedValue = null;
	public countries = countrycodearray;
	@Output() hideContactForm: EventEmitter<any> = new EventEmitter();

	constructor( private http: HttpClient ) { }

	ngOnInit() {
		this.contactForm = new FormGroup({
			name: new FormControl('', [<any>Validators.required]),
			email: new FormControl('', [<any>Validators.required]),
			countrycode: new FormControl('', [<any>Validators.required]),
			telephone: new FormControl('', [<any>Validators.required]),
			message: new FormControl('', [<any>Validators.required, <any>Validators.minLength(200)])
			});
	}

	public sendtosuperuser(user) {
		const headers = new HttpHeaders();
		const formObj = user.getRawValue();
		const data = JSON.stringify(formObj);


		headers.append('Content-Type', 'application/X-www-form-urlencoded');
		headers.append('Accept', 'application/json');

		this.http.post('https://formspree.io/office@fossasia.org', data, { headers: headers })
			.subscribe((response) => {
				this.http.post('https://formspree.io/office@fossasia.org', data, { headers: headers })
					.subscribe((responsesent) => {
						console.log('Sent successfully');
					});
			});
		}


	public showSubmit() {
		this.submitted = true;
	}

}
