/* tslint:disable:no-unused-variable */

import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';

import {Component} from '@angular/core';

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

describe('App: LoklakSearch', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.provideStore({})
			],
			declarations: [
				AppComponent,
				RouterOutletStubComponent
			],
		});
	});

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it('should have scroll position to be (0,0)', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(window.pageYOffset).toBe(0);
		expect(window.pageXOffset).toBe(0);
	}));
});
