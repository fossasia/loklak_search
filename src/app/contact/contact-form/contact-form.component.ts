import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

interface User {
	name: string;
	email: string;
	Number: number;
	type: string;
	input: string;
}

@Component({
	selector: 'contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	private ContactForm: FormGroup;
	private submitted: boolean = false;
	@Output() private hidecontactform: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		this.resetform();
	}

	private sendtosuperuser(User) {
		console.log(User);
	}

	private resetform() {
		this.ContactForm = new FormGroup({
			name: new FormControl('', [<any>Validators.required]),
			email: new FormControl('', [<any>Validators.required]),
			Number: new FormControl('', [<any>Validators.required, <any>Validators.minLength(12)]),
			type: new FormControl('', [<any>Validators.required]),
			input: new FormControl('', [<any>Validators.required, <any>Validators.minLength(100)])
			});
	}

	private showsubmit() {
		this.submitted = true;
	}

}
