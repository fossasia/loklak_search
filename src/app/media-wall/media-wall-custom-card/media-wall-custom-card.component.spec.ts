import { TestBed, async } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material';
import { MediaWallCustomCardComponent } from './media-wall-custom-card.component';
import { ColorPickerModule } from 'ngx-color-picker';

describe('MediaWallCustomCardComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				MatSlideToggleModule,
				ColorPickerModule
			],
			declarations: [
				MediaWallCustomCardComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomCardComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should change background color on calling changeBackgroundColor()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomCardComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallCard = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000',
			accentColor: '#dd0000'
		};
		component.ngOnInit();
		component.changeBackgroundColor('#ff0000');
		expect(component.customCard.backgroundColor).toBe('#ff0000');
	}));

	it('should change font color on calling changeFontColor()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomCardComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallCard = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000',
			accentColor: '#dd0000'
		};
		component.ngOnInit();
		component.changeFontColor('#ff0000');
		expect(component.customCard.fontColor).toBe('#ff0000');
	}));

	it('should change accent color on calling changeAccentColor()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomCardComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallCard = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000',
			accentColor: '#dd0000'
		};
		component.ngOnInit();
		component.changeAccentColor('#ff0000');
		expect(component.customCard.accentColor).toBe('#ff0000');
	}));

	it('should make background transparent on calling transparentBackground()', async(() => {
		const fixture = TestBed.createComponent(MediaWallCustomCardComponent);
		const component = fixture.debugElement.componentInstance;

		component.mediaWallCard = {
			backgroundColor: '#dd0000',
			fontColor: '#dd0000',
			accentColor: '#dd0000'
		};
		component.ngOnInit();
		component.transparentBackground();
		expect(component.customCard.backgroundColor).toBe('#fff');
	}));
});
