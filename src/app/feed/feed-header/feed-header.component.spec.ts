/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
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
import { SpeechService } from '../../services/speech.service';
import { SpeechComponent } from '../../speech/speech.component';

@Component({
	selector: 'service-box',
	template: ''
})
class ServiceBoxStubComponent {
}

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
				FeedAdvancedSearchComponent,
				ServiceBoxStubComponent,
				SpeechComponent
			],
			providers: [ SpeechService ]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(FeedHeaderComponent);
		expect(component).toBeTruthy();
	}));
});
