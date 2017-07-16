import { Component, Input, Output } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaWallCardComponent } from './media-wall-card.component';

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
				MediaWallLinkerStubComponent
			]
		});
	});

	it('should create an instance', () => {
		const component = TestBed.createComponent(MediaWallCardComponent);
		expect(component).toBeTruthy();
	});
});
