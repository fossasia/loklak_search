/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const mockmessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
	'Maecenas pellentesque lorem eu nulla interdum, vel ornare quam sagittis.' +
	'Suspendisse ullamcorper quam auctor viverra volutpat. Nulla diam mauris,' +
	'tincidunt sit amet aliquet non, ultrices vel orci. Aenean lorem massa,' +
	'porttitor at ligula id, venenatis lacinia dui.';

describe('Component: ContactForm', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				HttpClientModule
			],

			declarations: [
				ContactFormComponent,
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(ContactFormComponent);
		expect(component).toBeTruthy();
	}));

	it('should have form invalid when empty', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		expect(component.contactForm.valid).toBeFalsy();
	});

	it('should have valid name field', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const name = component.contactForm.controls['name'];
		expect(name.valid).toBeFalsy();
	});

	it('should have valid email field', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const email = component.contactForm.controls['email'];
		expect(email.valid).toBeFalsy();
	});

	it('should have valid countrycode field', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const countrycode = component.contactForm.controls['countrycode'];
		expect(countrycode.valid).toBeFalsy();
	});

	it('should have valid telephone field', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const telephone = component.contactForm.controls['telephone'];
		expect(telephone.valid).toBeFalsy();
	});

	it('should have valid message field', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const message = component.contactForm.controls['message'];
		expect(message.valid).toBeFalsy();
	});

	it('should have name field required', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const name = component.contactForm.controls['name'];
		const errors = name.errors || {};
		expect(errors['required']).toBeTruthy();
	});

	it('should have email field required', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const email = component.contactForm.controls['email'];
		const errors = email.errors || {};
		expect(errors['required']).toBeTruthy();
	});

	it('should have countrycode field required', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const countrycode = component.contactForm.controls['countrycode'];
		const errors = countrycode.errors || {};
		expect(errors['required']).toBeTruthy();
	});

	it('should have telephone field required', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const telephone = component.contactForm.controls['telephone'];
		const errors = telephone.errors || {};
		expect(errors['required']).toBeTruthy();
	});

	it('should have name field required and with minimum length 200', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		const message = component.contactForm.controls['message'];
		let errors = message.errors || {};
		expect(errors['required']).toBeTruthy();
		message.setValue('0123456789');
		errors = message.errors || {};
		expect(errors['required']).toBeFalsy();
		expect(errors['minlength']).toBeTruthy();
		message.setValue(mockmessage);
		errors = message.errors || {};
		expect(errors['required']).toBeFalsy();
		expect(errors['minlength']).toBeFalsy();
	});

	it('submitting a form should make submitted to true', () => {
		const fixture = TestBed.createComponent(ContactFormComponent);
		const component = fixture.componentInstance;
		component.ngOnInit();
		expect(component.contactForm.valid).toBeFalsy();
		component.contactForm.controls['name'].setValue('Lorem');
		component.contactForm.controls['email'].setValue('xyz@abc.com');
		component.contactForm.controls['countrycode'].setValue('91');
		component.contactForm.controls['telephone'].setValue('9876543210');
		component.contactForm.controls['message'].setValue(mockmessage);
		expect(component.contactForm.valid).toBeTruthy();

		component.showSubmit();
		expect(component.submitted).toBeTruthy();
	});
});
