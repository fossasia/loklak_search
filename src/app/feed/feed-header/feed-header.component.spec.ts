/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '@angular/material';
import { FeedHeaderComponent } from './feed-header.component';
import { FeedAdvancedSearchComponent } from '../feed-advanced-search/feed-advanced-search.component';
import { FeedLocationCustomizationComponent } from '../feed-location-customization/feed-location-customization.component';
import { FeedTimeCustomizationComponent } from '../feed-time-customization/feed-time-customization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducer } from '../../reducers';

describe('Component: FeedHeader', () => {
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
				FeedHeaderComponent,
				FeedAdvancedSearchComponent,
				FeedLocationCustomizationComponent,
				FeedTimeCustomizationComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(FeedHeaderComponent);
		expect(component).toBeTruthy();
	}));
});
