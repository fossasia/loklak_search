import { TestBed, async } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material';
import { MediaWallCustomBackgroundComponent } from './media-wall-custom-background.component';
import { ColorPickerModule } from 'ngx-color-picker';

describe('MediaWallCustomCardComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSlideToggleModule,
				ColorPickerModule
			],
			declarations: [
				MediaWallCustomBackgroundComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomBackgroundComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should change background color on calling changeBackgroundColor()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomBackgroundComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallBackground = {
			backgroundColor: '#dd0000'
		};
		component.ngOnInit();
		component.changeBackgroundColor('#ff0000');
		expect(component.customBackground.backgroundColor).toBe('#ff0000');
	}));

	it('should make background transparent on calling transparentBackground()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomBackgroundComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallBackground = {
			backgroundColor: '#dd0000'
		};
		component.ngOnInit();
		component.transparentBackground();
		expect(component.customBackground.backgroundColor).toBe('#fff');
	}));
});
