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
import { AuthService } from '../../services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';

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
				StoreModule.forRoot(reducers),
				AngularFireModule.initializeApp(environment.firebase, 'loklak-search')
			],
			declarations: [
				FeedHeaderComponent,
				FeedAdvancedSearchComponent,
				ServiceBoxStubComponent,
				SpeechComponent
			],
			providers: [
				SpeechService,
				AuthService,
				AngularFireAuth
			]
		});
	});

	it('should create an instance', async(() => {
		const component = TestBed.createComponent(FeedHeaderComponent);
		expect(component).toBeTruthy();
	}));
});
