import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaWallCustomThemeComponent } from './media-wall-custom-theme.component';

describe('MediaWallCustomThemeComponent', () => {
	let component: MediaWallCustomThemeComponent;
	let fixture: ComponentFixture<MediaWallCustomThemeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MediaWallCustomThemeComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaWallCustomThemeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
