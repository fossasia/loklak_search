/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('Component: Terms', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
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
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

	it('should have an app-navbar component', async(() => {
		const fixture = TestBed.createComponent(TermsComponent);
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));

	it('should have a div with id left', () => {
		const fixture = TestBed.createComponent(TermsComponent);
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('div#left'));
	});

	it('should have a div with id right', () => {
		const fixture = TestBed.createComponent(TermsComponent);
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('div#right'));
	});

	it('should have a sidebar menu', () => {
		const fixture = TestBed.createComponent(TermsComponent);
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('ul.sidebar-list'));
	});

	it('should have an active list on sidebar menu', () => {
		const fixture = TestBed.createComponent(TermsComponent);
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('ul.sidebar-list li.active'));
	});

	it('should scroll', async(() => {
		const fixture = TestBed.createComponent(TermsComponent);
		const compiled = fixture.debugElement.nativeElement;
		const element = compiled.querySelector('li.element4 a');

		element.click();
		fixture.whenStable().then(() => {
			expect(compiled.querySelector('li.element4.active')).toBeTruthy();
		});
	}));

});
