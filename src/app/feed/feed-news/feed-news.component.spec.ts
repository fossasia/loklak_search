import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FeedNewsComponent } from './feed-news.component';
import { ShareNewsStatusService } from '../../services/share-news-status.service';

@Component({
	selector: 'feed-card',
	template: ''
})
class FeedCardStubComponent {
	@Input() feedItem;
	@Input() feedIndex;
	@Output() showLightBox: EventEmitter<any>;
}

describe('FeedNewsComponent', () => {
	let component: FeedNewsComponent;
	let fixture: ComponentFixture<FeedNewsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				FeedNewsComponent
			],
			providers: [
				ShareNewsStatusService
			]
		})
	.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedNewsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
});
