/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedCardComponent } from './feed-card.component';

@Component({
	selector: 'app-lazy-img',
	template: ''
})
class LazyImgStubComponent {
	@Input() src: string;
	@Input() width: number;
	@Input() height: number;
	@Input() alt: string;
	@Input() showError = true;
	@Output() load: EventEmitter<boolean> = new EventEmitter<boolean>();
}

@Component({
	selector: 'feed-linker',
	template: ''
})
class FeedLinkerStubComponent {
	@Input() text;
	@Input() hashtags;
	@Input() mentions;
	@Input() links;
	@Input() unshorten;
	@Input() useAll;
	@Output() showed;
}

describe('Component: FeedCard', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedCardComponent,
				FeedLinkerStubComponent,
				LazyImgStubComponent
			]
		});
	});
	it('should create an instance', () => {
		const fixture = TestBed.createComponent(FeedCardComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should set inviewport to true on calling inview(true)', async(() => {
		const fixture = TestBed.createComponent(FeedCardComponent);
		const component = fixture.debugElement.componentInstance;
		component.inview({ value: true });

		expect(component.inviewport).toBe(true);
	}));

	it('should use feedItem on calling ttt()', async(() => {
		const fixture = TestBed.createComponent(FeedCardComponent);
		const component = fixture.debugElement.componentInstance;

		component.feedItem = {
			images : [],
			screen_name : '@fossasia',
			user : {
				name : 'testUser'
			},
			text : 'testText',
			retweet_count : 20,
			favourites_count : 25,
			created_at : new Date(),
			videos : []
		};
		component.ttt();
		expect(component.datetime).toBe('now');
		expect(component.itemText).toBe('testText');
		expect(component.profileName).toBe('testUser');
		expect(component.retweetCount).toBe('20');
		expect(component.favoriteCount).toBe('25');
		expect(component.profileURL).toBe('https://twitter.com/@fossasia/');
	}));

	it('should have feedLinker component', async(() => {
		const fixture = TestBed.createComponent(FeedLinkerStubComponent);
		const component = fixture.debugElement.componentInstance;

		expect(component).toBeTruthy();
	}));

	it('should have app-lazy-img component', async(() => {
		const fixture = TestBed.createComponent(LazyImgStubComponent);
		const component = fixture.debugElement.componentInstance;

		expect(component).toBeTruthy();
	}));

	it('should emit showLightBox EventEmitter on click', async(() => {
		const fixture = TestBed.createComponent(FeedCardComponent);
		const component = fixture.debugElement.componentInstance;
		spyOn(component.showLightBox, 'emit');

		component.feedItem = {
			images : [],
			screen_name : '@fossasia',
			user : {
				name : 'testUser'
			},
			text : 'testText',
			retweet_count : 20,
			favourites_count : 25,
			created_at : new Date(),
			videos : []
		};

		const nativeElement = fixture.nativeElement;
		const button = nativeElement.querySelector('div.card-image>a');
		button.click();
		expect(component.showLightBox.emit).toHaveBeenCalled();
	}));

	it('should call sanitizeVideoURLs() and filterValidImageURLS()', async(() => {
		const fixture = TestBed.createComponent(FeedCardComponent);
		const component = fixture.debugElement.componentInstance;

		component.feedItem = {
			images : [
				'https://dev.loklak.org/server/_static//images/cow.svg'
			],
			screen_name : '@fossasia',
			user : {
				name : 'testUser'
			},
			text : 'testText',
			retweet_count : 20,
			favourites_count : 25,
			created_at : new Date(),
			videos : [
				'https://www.youtube.com/watch?v=RRlOCHD-p8Q'
			]
		};

		component.sanitizeVideoURLs();
		expect(component.sanitizedVideos.length).toBe(1);
		component.filterValidImageURLS();
		expect(component.filteredImages.length).toBe(1);
	}));
});
