/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContactComponent } from './contact.component';

import { RouterStub } from '../../testing';

@Component({
	selector: 'app-footer',
	template: ''
})
class FooterComponent { }

describe('Component: Contact', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				ContactComponent,
				FooterComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub }
			]
		});
	});

	it('should create an instance', () => {
		let component = new ContactComponent();
		expect(component).toBeTruthy();
	});
});
