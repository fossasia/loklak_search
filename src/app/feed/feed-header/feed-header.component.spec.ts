/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
	MatAutocompleteModule,
	MatIconModule,
	MatButtonToggleModule,
	MatMenuModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { FeedHeaderComponent } from './feed-header.component';
import { FeedAdvancedSearchComponent } from '../feed-advanced-search/feed-advanced-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from '../../reducers';
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
				MatIconModule,
				MatMenuModule,
				MatAutocompleteModule,
				FormsModule,
				StoreModule.forRoot(reducers)
			],
			declarations: [
				FeedHeaderComponent,
				FeedAdvancedSearchComponent,
				ServiceBoxStubComponent,
				SpeechComponent
			],
			providers: [
				SpeechService
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(FeedHeaderComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should call setupSuggestBoxClosing() on calling OnEnter()', async(() => {
		const fixture = TestBed.createComponent(FeedHeaderComponent);
		const component = fixture.debugElement.componentInstance;
		spyOn(component, 'setupSuggestBoxClosing');
		component.searchInputControl = {
			value: 'testValue'
		};
		component.onEnter({ which : 13 });
		expect(component.setupSuggestBoxClosing).toHaveBeenCalled();
	}));

	it('should call setupSuggestBoxClosing() on calling onClick()', async(() => {
		const fixture = TestBed.createComponent(FeedHeaderComponent);
		const component = fixture.debugElement.componentInstance;
		spyOn(component, 'setupSuggestBoxClosing');
		component.searchInputControl = {
			value: 'testValue'
		};
		component.onClick();
		expect(component.setupSuggestBoxClosing).toHaveBeenCalled();
	}));

	it('should call setupSuggestBoxClosing() on calling closeSuggestBox()', async(() => {
		const fixture = TestBed.createComponent(FeedHeaderComponent);
		const component = fixture.debugElement.componentInstance;
		spyOn(component.autoCompleteTrigger, 'closePanel');
		component.closeSuggestBox();
		expect(component.autoCompleteTrigger.closePanel).toHaveBeenCalled();
	}));
});
