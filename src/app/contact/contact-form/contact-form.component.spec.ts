/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


describe('Component: ContactForm', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule,
				HttpModule
			],

			declarations: [
				ContactFormComponent,
			]
		});
	});

	it('should create an instance', async(() => {
		let component = TestBed.createComponent(ContactFormComponent);
		expect(component).toBeTruthy();
	}));
});
