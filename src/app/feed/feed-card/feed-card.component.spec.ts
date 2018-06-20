/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
		const component = TestBed.createComponent(FeedCardComponent);
		expect(component).toBeTruthy();
	});
});
