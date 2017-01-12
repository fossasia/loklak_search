/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterOutletStubComponent } from '../testing';

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
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
