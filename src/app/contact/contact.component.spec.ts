/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ContactComponent } from './contact.component';

import { RouterStub } from '../../testing';

@Component({
	selector: 'contact-form',
	template: ''
})
class ContactFormStubComponent {
	@Output() private hidecontactform: EventEmitter<any>;
}

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

describe('Component: Contact', () => {
	let contactTitle: Title;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule
			],
			declarations: [
				AppNavbarStubComponent,
				ContactComponent,
				ContactFormStubComponent,
				AppFooterStubComponent
			],
			providers: [
				{ provide: Router, useClass: RouterStub },
				{ provide: Title, useClass: Title }
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(ContactComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have a title Contact Loklak', () => {
		const fixture = TestBed.createComponent(ContactComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		contactTitle = TestBed.get(Title);
		expect(contactTitle.getTitle()).toBe('Contact Loklak');
	});

		it('should have an app-footer component', async(() => {
		const fixture = TestBed.createComponent(ContactComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

		it('should have an app-footer component', async(() => {
		const fixture = TestBed.createComponent(ContactComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

		it('should have an app-navbar component', async(() => {
		const fixture = TestBed.createComponent(ContactComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));
});
