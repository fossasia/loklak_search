import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
	FormGroup,
	FormControl,
	FormBuilder,
	Validators
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { countrycodearray } from '../../shared/countrycode/countrycode';
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

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.contactForm = new FormGroup({
			name: new FormControl('', [<any>Validators.required]),
			email: new FormControl('', [
				<any>Validators.required,
				<any>Validators.email
			]),
			countrycode: new FormControl('', [<any>Validators.required]),
			telephone: new FormControl('', [
				<any>Validators.required,
				<any>Validators.minLength(10),
				<any>Validators.pattern('^[0-9]*$')
			]),
			message: new FormControl('', [
				<any>Validators.required,
				<any>Validators.minLength(100)
			])
		});
	}
	public sendtosuperuser(user) {
		this.hideContactForm.emit(false);
		const headers = new HttpHeaders();
		const formObj = this.contactForm.value;
		const data = JSON.stringify(formObj);
		console.log(this.contactForm.value);

		headers.append('Content-Type', 'application/X-www-form-urlencoded');
		headers.append('Accept', 'application/json');

		this.http
			.post('https://formspree.io/office@fossasia.org', data, {
				headers: headers
			})
			.subscribe(response => {
				this.http
					.post('https://formspree.io/office@fossasia.org', data, {
						headers: headers
					})
					.subscribe(responsesent => {
						console.log('Sent successfully');
					});
			});
	}

	public showSubmit() {
		this.submitted = true;
	}
}
