import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

interface Subscriber {
	name: string;
	email: string;
}


@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
	private SubscribeForm: FormGroup;
	private formcontrol: Observable<boolean>;
	private submitted: boolean = false;
	private selectedValue = null;
	lat: number = 10.0385333;
  	lng: number = 105.7685663;
	constructor(  private http: Http ) { }

	ngOnInit() {
		this.SubscribeForm = new FormGroup({
			name: new FormControl('', [<any>Validators.required]),
			email: new FormControl('', [<any>Validators.required])
		   });
	}

	private sendtosuperuser(Subscriber) {
		let headers = new Headers();
		let formObj = Subscriber.getRawValue();
		let data = JSON.stringify(formObj);


		headers.append('Content-Type', 'application/X-www-form-urlencoded');
		headers.append('Accept', 'application/json');

		this.http.post('http://news.fossasia.org/subscribe', data, {headers: headers})
			.subscribe((response) => {
				if (response.json().success) {
					this.http.post('http://news.fossasia.org/subscribe', data, {headers: headers})
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

	private contactform(event) {
		this.formcontrol = event;
	}
}


