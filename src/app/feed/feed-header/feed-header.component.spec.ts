/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
	MatAutocompleteModule,
	MatButtonToggleModule,
	MatMenuModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { FeedHeaderComponent } from './feed-header.component';
import { FeedAdvancedSearchComponent } from '../feed-advanced-search/feed-advanced-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducer } from '../../reducers';

describe('Component: FeedHeader', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				MatButtonToggleModule,
				MatMenuModule,
				MatAutocompleteModule,
				FormsModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [
				FeedHeaderComponent,
				FeedAdvancedSearchComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(FeedHeaderComponent);
		expect(component).toBeTruthy();
	}));
});
