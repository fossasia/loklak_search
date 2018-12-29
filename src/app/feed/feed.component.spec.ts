/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import {Location} from '@angular/common';
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

import { Observable, Subject, of } from 'rxjs';
import * as fromRoot from '../reducers';

import { FeedComponent } from './feed.component';
import { HomeComponent } from '../home/home.component';
import { ApiResponseResult } from '../models/api-response';
import { SpeechService } from '../services/speech.service';
import { SpeechComponent } from '../speech/speech.component';
import { Params } from '@angular/router';

@Component({
	selector: 'app-feed-news',
	template: ''
})
class AppFeedNewsStubComponent {
}

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
	@Input() private ApiResponseResult;
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
	let location: Location;
	let router: Router;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterModule.forRoot([]),
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
				StoreModule.forRoot(fromRoot.reducers)
			],
			declarations: [
				AppFeedNewsStubComponent,
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
			providers: [
				SpeechService,
				{ provide: ActivatedRoute, useValue: { queryParams: of({ query : 'fossasia'}) } }
			]
		});

		router = TestBed.get(Router);
		location = TestBed.get(Location);
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should set query to blank initially', async(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const component = fixture.debugElement.componentInstance;
		const query$ = component.store.select(fromRoot.getQuery);
		let displayString: string;
		const subscription = query$.subscribe(query => displayString = query.displayString);
		expect(displayString).toBe('');
		subscription.unsubscribe();
	}));

	it('should have an feed-header element', async(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('feed-header')).toBeTruthy();
	}));

	it('should have no element in initial phase', async(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('feed-card')).toBeFalsy();
		expect(compiled.querySelector('feed-pagination')).toBeFalsy();
		expect(compiled.querySelector('feed-footer')).toBeFalsy();
		expect(compiled.querySelector('user-info-box')).toBeFalsy();
		expect(compiled.querySelector('info-box')).toBeFalsy();
		expect(compiled.querySelector('feed-not-found')).toBeFalsy();
		expect(compiled.querySelector('app-feed-news')).toBeFalsy();
	}));

	it('should update query via activatedRoute on calling ngOnInit()', fakeAsync(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const component = fixture.debugElement.componentInstance;
		component.ngOnInit();
		const query$ = component.store.select(fromRoot.getQuery);
		let displayString: string;
		const subscription = query$.subscribe(query => displayString = query.displayString);
		expect(displayString).toBe('fossasia');
		subscription.unsubscribe();
	}));

	it('should dispatch new query on calling search()', fakeAsync(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const component = fixture.debugElement.componentInstance;
		component.search('India');
		const query$ = component.store.select(fromRoot.getQuery);
		let displayString: string;
		const subscription = query$.subscribe(query => displayString = query.displayString);
		expect(displayString).toBe('India');
		subscription.unsubscribe();
	}));

	it('should route to /search on calling relocateURL()', fakeAsync(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const component = fixture.debugElement.componentInstance;
		component.relocateURL('fossasia');
		expect(location.path()).toBe('/search?query=fossasia');
	}));

	it('should set navIsFixed false on window scroll', () => {
		const fixture = TestBed.createComponent(FeedComponent);
		const component = fixture.debugElement.componentInstance;
		window.dispatchEvent(new Event('scroll'));
		expect(component.navIsFixed).toBe(false);
	});

	it('should have app-footer element', async(() => {
		const fixture = TestBed.createComponent(FeedComponent);
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

});
