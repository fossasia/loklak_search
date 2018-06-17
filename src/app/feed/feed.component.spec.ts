/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
	MatAutocompleteModule,
	MatMenuModule,
	MatIconModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatListModule,
	MatChipsModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { Observable } from 'rxjs';

import { FeedComponent } from './feed.component';
import { ApiResponseResult } from '../models/api-response';
import { SpeechService } from '../services/speech.service';
import { SpeechComponent } from '../speech/speech.component';


@Component({
	selector: 'feed-header',
	template: ''
})
class FeedHeaderStubComponent {
	@Input() query: string;
	@Input() searchInputControl: FormControl;
	@Input() suggestionList;
	@Input() areResultsAvailable: ApiResponseResult[];
	@Input() resultsLoading: boolean;
	@Input() doCloseSuggestBox$: Observable<boolean>;
}

@Component({
	selector: 'feed-card',
	template: ''
})
class FeedCardStubComponent {
	@Input() feedItem;
	@Input() feedIndex;
	@Output() showLightBox: EventEmitter<any>;
}

@Component({
	selector: 'feed-footer',
	template: ''
})
class FeedFooterStubComponent {
	@Input() private query;
	@Input() private apiResponseTags;
}

@Component({
	selector: 'app-footer',
	template: ''
})
class FooterStubComponent { }

@Component({
	selector: 'feed-not-found',
	template: ''
})
class FeedNotFoundStubComponent {
	@Input() private query;
}

@Component({
	selector: 'feed-pagination',
	template: ''
})
class FeedPaginationStubComponent {
	@Input() private isNextPageLoading;
	@Input() private areMorePagesAvailable;
	@Output() private paginate;
}

@Component({
	selector: 'feed-linker',
	template: ''
})
class FeedLinkerStubComponent {
	@Input() private query;
}

@Component({
	selector: 'info-box',
	template: ''
})
class InfoBoxStubComponent {
	@Input() private query;
	@Input() private apiResponseResult;
}

@Component({
	selector: 'user-info-box',
	template: ''
})
class UserInfoBoxStubComponent {
	@Input() private apiResponseUser;
	@Input() private apiResponseUserFollowing;
	@Input() private apiResponseUserFollowers;
	@Input() private isUserResponseLoading;
}

@Component({
	selector: 'feed-user-card',
	template: ''
})
class FeedUserCardStubComponent {
	@Input() private feedItem;
	@Input() private feedIndex;
}

@Component({
	selector: 'feed-lightbox',
	template: ''
})
class FeedLightboxStubComponent {
	@Input() private feedItem;
	@Output() private hideLightBox: EventEmitter<any>;
}

describe('Component: Feed', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				MatAutocompleteModule,
				MatMenuModule,
				MatIconModule,
				MatButtonModule,
				MatButtonToggleModule,
				MatCardModule,
				MatListModule,
				MatChipsModule,
				StoreModule.forRoot({})
			],
			declarations: [
				FeedComponent,
				FeedHeaderStubComponent,
				FeedFooterStubComponent,
				FeedCardStubComponent,
				FooterStubComponent,
				FeedNotFoundStubComponent,
				FeedLinkerStubComponent,
				FeedPaginationStubComponent,
				InfoBoxStubComponent,
				UserInfoBoxStubComponent,
				FeedUserCardStubComponent,
				FeedLightboxStubComponent,
				SpeechComponent
			],
			providers: [ SpeechService ]
		});
	});

});
