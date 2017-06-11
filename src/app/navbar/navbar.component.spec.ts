/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('Component: Navbar', () => {
	it('should create an instance', () => {
		const component = new NavbarComponent();
		expect(component).toBeTruthy();
	});

	it('should have toggleMenu function which should change the state of transition', () => {
		const component = new NavbarComponent();
		expect(component.menuState).toEqual('in');
		component.toggleMenu();
		expect(component.menuState).toEqual('out');
	});
});
