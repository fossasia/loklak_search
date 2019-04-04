import { TestBed, async } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material';
import { MediaWallCustomHeaderComponent } from './media-wall-custom-header.component';
import { ColorPickerModule } from 'ngx-color-picker';

describe('MediaWallCustomHeaderComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSlideToggleModule,
				ColorPickerModule
			],
			declarations: [
				MediaWallCustomHeaderComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomHeaderComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should change background color on calling changeBackgroundColor()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomHeaderComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallHeader = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000'
		};
		component.ngOnInit();
		component.changeBackgroundColor('#ff0000');
		expect(component.customHeader.backgroundColor).toBe('#ff0000');
	}));

	it('should change font color on calling changeFontColor()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomHeaderComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallHeader = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000'
		};
		component.ngOnInit();
		component.changeFontColor('#ff0000');
		expect(component.customHeader.fontColor).toBe('#ff0000');
	}));

	it('should make background transparent on calling transparentBackground()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomHeaderComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallHeader = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000'
		};
		component.ngOnInit();
		component.transparentBackground();
		expect(component.customHeader.backgroundColor).toBe('#fff');
	}));
});
