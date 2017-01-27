/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../reducers';
import { RouterStub } from '../../testing';
import { FeedComponent } from './feed.component';


@Component({
	selector: 'feed-header',
	template: ''
})
class FeedHeaderStubComponent {
	@Input() private searchInputControl;
	@Output() private searchEventEmitter: EventEmitter<any>;
}

@Component({
	selector: 'feed-card',
	template: ''
})
class FeedCardStubComponent {
	@Input() private feedItem;
	@Input() private feedIndex;
	@Output() private showLightBox: EventEmitter<any>;
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
	@Input() private apiResponseAggregations;
}

@Component({
	selector: 'user-info-box',
	template: ''
})
class UserInfoBoxComponent {
	@Input() private apiResponseUser;
	@Input() private isUserResponseLoading;
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
				StoreModule.provideStore(reducer)
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
				FeedLightboxStubComponent
			]
		});
	});

	it('should create an instance', async(() => {
		let fixture = TestBed.createComponent(FeedComponent);
		let component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should have a feed-header component', async(() => {
		let fixture = TestBed.createComponent(FeedComponent);
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('feed-header')).toBeTruthy();
	}));

	it('should have an app-footer component', async(() => {
		let fixture = TestBed.createComponent(FeedComponent);
		let component = fixture.debugElement.componentInstance;
		let compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('app-footer')).toBeTruthy();
	}));

});
