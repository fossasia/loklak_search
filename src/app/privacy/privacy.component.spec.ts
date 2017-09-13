/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { PrivacyComponent } from './privacy.component';

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
	let privacyTitle: Title;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				PrivacyComponent,
				AppNavbarStubComponent,
				AppFooterStubComponent
			],
			providers: [{ provide: Title, useClass: Title }]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(PrivacyComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

		it('should have a title Welcome to Loklak Privacy Policy', () => {
			const fixture = TestBed.createComponent(PrivacyComponent);
			fixture.detectChanges();
			const component = fixture.debugElement.componentInstance;
			privacyTitle = TestBed.get(Title);
			expect(privacyTitle.getTitle()).toBe('Loklak Privacy Policy');

	});

		it('should have an app-footer component', async(() => {
		const fixture = TestBed.createComponent(PrivacyComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

		it('should have an app-navbar component', async(() => {
		const fixture = TestBed.createComponent(PrivacyComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));
});
