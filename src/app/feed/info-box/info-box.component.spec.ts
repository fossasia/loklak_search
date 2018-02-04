/* tslint:disable:no-unused-variable */

import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {StoreModule} from '@ngrx/store';
import {InfoBoxComponent} from './info-box.component';
import {reducer} from '../../reducers';

describe('Component: InfoBox', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ChartsModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [
				InfoBoxComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(InfoBoxComponent);
		expect(component).toBeTruthy();
	}));
});
