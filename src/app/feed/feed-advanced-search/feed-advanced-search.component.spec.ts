/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '@angular/material';
import { FeedAdvancedSearchComponent } from './feed-advanced-search.component';
import { FeedLocationCustomizationComponent } from '../feed-location-customization/feed-location-customization.component';
import { FeedTimeCustomizationComponent } from '../feed-time-customization/feed-time-customization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducer } from '../../reducers';

describe('Component: FeedAdvancedSearchComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MaterialModule,
				ReactiveFormsModule,
				FormsModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [
				FeedAdvancedSearchComponent,
				FeedLocationCustomizationComponent,
				FeedTimeCustomizationComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(FeedAdvancedSearchComponent);
		expect(component).toBeTruthy();
	}));
});
