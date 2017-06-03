/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Output, EventEmitter } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContactComponent } from './contact.component';

import { RouterStub } from '../../testing';

@Component({
	selector: 'contact-form',
	template: ''
})
class ContactFormStubComponent {
	@Output() private hidecontactform: EventEmitter<any>;
}

@Component({
	selector: 'app-footer',
	template: ''
})
class FooterComponent { }

describe('Component: Contact', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule
			],
			declarations: [
				ContactComponent,
				ContactFormStubComponent,
				FooterComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub }
			]
		});
	});

	it('should create an instance', () => {
		const component = new ContactComponent();
		expect(component).toBeTruthy();
	});
});
