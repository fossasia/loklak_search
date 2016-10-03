/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterOutletStubComponent } from '../testing';

describe('App: LoklakSearch', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				RouterOutletStubComponent
			],
		});
	});

	it('should create the app', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have as title 'Loklak Search!'`, async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('Loklak Search!');
	}));
});
