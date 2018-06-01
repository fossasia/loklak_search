/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { FeedAdvancedSearchComponent } from './feed-advanced-search.component';
import {
	MatButtonToggleModule,
	MatMenuModule,
	MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from '../../reducers';

describe('Component: FeedAdvancedSearchComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				MatButtonToggleModule,
				MatMenuModule,
				MatIconModule,
				FormsModule,
				StoreModule.forRoot(reducers)
			],
			declarations: [
				FeedAdvancedSearchComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(FeedAdvancedSearchComponent);
		expect(component).toBeTruthy();
	}));
});
