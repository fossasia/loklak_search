import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaWallCardComponent } from './media-wall-card.component';

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
	selector: 'media-wall-linker',
	template: ''
})
class MediaWallLinkerStubComponent {
	@Input() text;
	@Input() hashtags;
	@Input() mentions;
	@Input() links;
	@Input() unshorten;
	@Input() useAll;
	@Input() wallCustomText;
	@Output() onShowed;
}


describe('MediaWallCardComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				MediaWallCardComponent,
				MediaWallLinkerStubComponent,
				LazyImgStubComponent
			]
		});
	});

	it('should create an instance', () => {
		const component = TestBed.createComponent(MediaWallCardComponent);
		expect(component).toBeTruthy();
	});
});
