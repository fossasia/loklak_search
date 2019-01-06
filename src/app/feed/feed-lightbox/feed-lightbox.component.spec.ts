/* tslint:disable:no-unused-variable */
import { FeedLightboxComponent } from './feed-lightbox.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
	selector: 'feed-linker',
	template: ''
})
class FeedLinkerStubComponent {
	@Input() text: string;
	@Input() hashtags: string[] = new Array<string>();
	@Input() mentions: string[] = new Array<string>();
	@Input() links: string[] = new Array<string>();
	@Input() unshorten: Object = {};
	@Input() useAll = false;
	@Output() showed: EventEmitter<boolean> = new EventEmitter<boolean>();
}

describe('Component: FeedLightbox', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedLinkerStubComponent,
				FeedLightboxComponent
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(FeedLightboxComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should use feedItem for various function', async(() => {
		const fixture = TestBed.createComponent(FeedLightboxComponent);
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

	it('should emit hideLightBox EventEmitter on click', async(() => {
		const fixture = TestBed.createComponent(FeedLightboxComponent);
		const component = fixture.debugElement.componentInstance;
		spyOn(component.hideLightBox, 'emit');
		component.onShowed();
		expect(component.hideLightBox.emit).toHaveBeenCalled();
	}));
});
