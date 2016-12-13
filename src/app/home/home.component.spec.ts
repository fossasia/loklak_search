/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
				RouterTestingModule
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

	it('should create an instance', () => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have a header as Loklak Search!', () => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component.header).toBe('Loklak Search!');
	});

	it('should render header in a h1 tag', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('div.wrapper h1').textContent).toBe('Loklak Search!');
	}));

	it('should have a correct headerImageUrl property', () => {
		let fixture = TestBed.createComponent(HomeComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component.headerImageUrl).toBe('assets/images/cow_150x175.png');
	});

	it('should render header cow image correctly', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		let image: HTMLImageElement = compiled.querySelector('div.wrapper img');

		let imgSrc: string = image.src;
		let relativePath: string = imgSrc.replace(window.location.origin + '/', ''); // Removing the host and port from the image source

		expect(relativePath).toBe(component.headerImageUrl);
		expect(image.alt).toBe('Loklak Cow');	// Correct alt text 'Loklak Cow' must be present.
	}));

	it('should have an input element for search inputs', async(() => {
		let fixture = TestBed.createComponent(HomeComponent);
		fixture.detectChanges();
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('div.wrapper div.search-form input#search')).toBeTruthy();
	}));
});
