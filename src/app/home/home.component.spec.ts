/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as apiAction from '../actions/api';
import { HomeComponent } from './home.component';

import { RouterStub } from '../../testing';

@Component({
	selector: 'app-footer',
	template: ''
})
class FooterStubComponent { }

describe('Component: Home', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				StoreModule.provideStore(fromRoot.reducer)
			],
			declarations: [
				HomeComponent,
				FooterStubComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub }
			]
		});
	});

	it('should create an instance', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should have a header as Loklak Search!', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component.header).toBe('Loklak Search!');
	}));

	it('should render header in a h1 tag', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('div.wrapper h1').textContent).toBe('Loklak Search!');
	}));

	it('should have logo with correct alt text property', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		let image: HTMLImageElement = compiled.querySelector('div.wrapper img');

		expect(image).toBeTruthy();
		expect(image.alt).toBe('Loklak Cow');	// Correct alt text 'Loklak Cow' must be present.
	}));

	it('should have "_queryControl" property.', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		expect(component._queryControl).toBeTruthy();
	}));

	it('should have an input element for search inputs', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('div.wrapper div.search-form input#search')).toBeTruthy();
	}));

	it('should focus the input search element on initialization', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		let inputElement: HTMLInputElement = compiled.querySelector('div.wrapper div.search-form input#search');
		expect(document.activeElement).toBe(inputElement);
	}));

	it('should dispatch "SearchAction" when value of _queryControl changes', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		let value = 'a';

		let query$ = component.store.select(fromRoot.getSearchQuery);
		let qs: string;
		let subscription = query$.subscribe(query => qs = query.queryString);

		expect(qs).toBeFalsy();
		component._queryControl.setValue(value);
		expect(qs).toBe(value);

		subscription.unsubscribe();
	}));

	it('should have _queryControl having the control of input field', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		let inputElement: HTMLInputElement = compiled.querySelector('div.wrapper div.search-form input#search');

		// Inititally the conrol and input should both be empty
		expect(component._queryControl.value).toBeFalsy();
		expect(inputElement.value).toBeFalsy();

		// Changing the value of control should change the value of input field
		component._queryControl.setValue('a');
		fixture.detectChanges();
		inputElement = compiled.querySelector('div.wrapper div.search-form input#search');
		expect(inputElement.value).toBe('a');

		// Changing the value of input field should change the value of control
		compiled.querySelector('div.wrapper div.search-form input#search').value = 'a';
		fixture.detectChanges();
		expect(component._queryControl.value).toBe('a');
	}));

	it('should have an app-footer element', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));
});
