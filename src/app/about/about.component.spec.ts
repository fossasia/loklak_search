/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AboutComponent } from './about.component';

import { RouterStub } from '../../testing';
@Component({
	selector: 'app-footer',
	template: ''
})
class FooterComponent { }

describe('Component: About', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				AboutComponent,
				FooterComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub }
			]
		});
	});

	it('should create an instance', () => {
		let component = new AboutComponent();
		expect(component).toBeTruthy();
	});
});


