/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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

@Component({
	selector: 'app-lazy-img',
	template: ''
})
class LazyImgStubComponent {
	@Input() src: string;
	@Input() width: number;
	@Input() height: number;
	@Input() alt: string;
	@Input() showError = true;
	@Output() load: EventEmitter<boolean> = new EventEmitter<boolean>();
}

describe('Component: Home', () => {
	let homeTitle: Title;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				StoreModule.provideStore(fromRoot.reducer)
			],
			declarations: [
				HomeComponent,
				FooterStubComponent,
				LazyImgStubComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub },
				{ provide: Title, useClass: Title }
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should have a title Loklak Search', () => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;

		homeTitle = TestBed.get(Title);
		expect(homeTitle.getTitle()).toBe('Peer to Peer Social Media Message Search Engine');
	});

	it('should have logo with correct alt text property', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		const image = compiled.querySelector('app-lazy-img');

		expect(image).toBeTruthy();
		expect(image.getAttribute('alt')).toBe('loklak Search - Distributed Social Media Message Search Engine');
	}));

	it('should have "_queryControl" property.', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(component._queryControl).toBeTruthy();
	}));

	it('should have an input element for search inputs', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('div.wrapper div.search-form input#search')).toBeTruthy();
	}));

	it('should focus the input search element on initialization', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		const inputElement: HTMLInputElement = compiled.querySelector('div.wrapper div.search-form input#search');
		expect(document.activeElement).toBe(inputElement);
	}));

	it('should dispatch "SearchAction" when value of _queryControl changes', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		const value = 'a';

		const query$ = component.store.select(fromRoot.getQuery);
		let displayString: string;
		const subscription = query$.subscribe(query => displayString = query.displayString);

		component._queryControl.setValue(value);
		expect(displayString).toBe(value);

		subscription.unsubscribe();
	}));

	it('should have _queryControl having the control of input field', async(() => {
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

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
		const fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));
});
