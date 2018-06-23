/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { TermsComponent } from './terms.component';
import { Store, StateObservable } from '@ngrx/store';

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
				TermsComponent,
				AppNavbarStubComponent,
				AppFooterStubComponent
			],
			providers: [
				{ provide: Store, useValue: {} },
				{ provide: StateObservable, useValue: {} }
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(TermsComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
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
