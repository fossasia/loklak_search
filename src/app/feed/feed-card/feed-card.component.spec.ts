/* tslint:disable:no-unused-variable */

import { Component, Input, Output } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedCardComponent } from './feed-card.component';

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
	@Output() onShowed;
}

describe('Component: FeedCard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedCardComponent,
				FeedLinkerStubComponent
			]
		});
	});
	it('should create an instance', () => {
		const component = TestBed.createComponent(FeedCardComponent);
		expect(component).toBeTruthy();
	});
});
