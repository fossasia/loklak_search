/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { AboutComponent } from './about.component';
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
			imports: [
				RouterTestingModule
			],
			declarations: [
				AboutComponent,
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
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have an app-footer component', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

	it('should have an app-navbar component', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-navbar')).toBeTruthy();
	}));

	it('should be truthy h2', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('h2')).toBeTruthy();
	}));

	it('should be truthy h3', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('h3')).toBeTruthy();
	}));

	it('should be truthy h5', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('h5')).toBeTruthy();
	}));

	it('should be truthy p', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('p')).toBeTruthy();
	}));

	it('should be truthy a', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('a')).toBeTruthy();
	}));

	it('should be truthy div', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('div')).toBeTruthy();
	}));

	it('should have h2 text heading', async(() => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		const compiled = fixture.debugElement.nativeElement;

		const innerText = 'Our mission is to make the world’s social media information' +
		' openly accessible and useful generating open knowledge for all.';
		expect(compiled.querySelector('h2').innerText).toContain(innerText);
	}));
});
