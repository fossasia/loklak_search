/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { TermsComponent } from './terms.component';

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
	let termsTitle: Title;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TermsComponent,
				AppNavbarStubComponent,
				AppFooterStubComponent
			],
			providers: [{ provide: Title, useClass: Title }]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(TermsComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

		it('should have a title Loklak Terms of Service', () => {
			const fixture = TestBed.createComponent(TermsComponent);
			fixture.detectChanges();
			const component = fixture.debugElement.componentInstance;
			termsTitle = TestBed.get(Title);
			expect(termsTitle.getTitle()).toBe('Loklak Terms of Service');
	});

		it('should have an app-footer component', async(() => {
		const fixture = TestBed.createComponent(TermsComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

		it('should have an app-navbar component', async(() => {
		const fixture = TestBed.createComponent(TermsComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));
});
