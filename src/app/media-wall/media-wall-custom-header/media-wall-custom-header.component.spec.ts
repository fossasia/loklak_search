import { TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material';
import { MediaWallCustomHeaderComponent } from './media-wall-custom-header.component';


describe('MediaWallCustomHeaderComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSlideToggleModule
			],
			declarations: [
				MediaWallCustomHeaderComponent
			]
		});

		it('should create an instance', () => {
			const fixture = TestBed.createComponent(MediaWallCustomHeaderComponent);
			const component = fixture.debugElement.componentInstance;
			expect(component).toBeTruthy();
		});
	});
});
