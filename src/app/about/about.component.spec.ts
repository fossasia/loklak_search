/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { AboutComponent } from './about.component';


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
	let aboutTitle: Title;
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
			providers: [{ provide: Title, useClass: Title }]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(AboutComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should have a title About Loklak', () => {
		const fixture = TestBed.createComponent(AboutComponent);
		fixture.detectChanges();
		const component = fixture.debugElement.componentInstance;
		aboutTitle = TestBed.get(Title);
		expect(aboutTitle.getTitle()).toBe('About Loklak');
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
});
