/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AboutComponent } from './about.component';

@Component({
	selector: 'app-navbar',
	template: ''
})
class AppNavbarStubComponent { }

@Component({
	selector: 'app-footer',
	template: ''
})
class AppFooterStubComponent { }

describe('Component: About', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				AboutComponent,
				AppNavbarStubComponent,
				AppFooterStubComponent
			]
		});
	});
	it('should create an instance', () => {
		const component = TestBed.createComponent(AboutComponent);
		expect(component).toBeTruthy();
	});
});
