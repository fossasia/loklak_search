/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { StoreModule } from '@ngrx/store';
import { InfoBoxComponent } from './info-box.component';
import * as fromRoot from '../../reducers';

describe('Component: InfoBox', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ChartsModule,
				StoreModule.forRoot(fromRoot.reducers)
			],
			declarations: [
				InfoBoxComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(InfoBoxComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should give valid result on non-empty ApiResponseResult', async(() => {
		const fixture = TestBed.createComponent(InfoBoxComponent);
		const component = fixture.debugElement.componentInstance;

		component.ApiResponseResult = [
			{
				hashtags: [
					'FOSSASIA',
					'opensource',
					'pslab',
					'35c3',
					'madeinsingapore',
					'FOSSASIA',
					'pslab'
				],
				screen_name: [
					'hpdang'
				],
				user: {
					profile_image_url_https: 'https://pbs.twimg.com/profile_images/1141238022/fossasia-cubelogo_400x400.jpg',
				},
				mentions: [
					'fossasia',
					'mariobehling',
					'hpdang',
					'mariobehling'
				],
				created_at: [
					new Date()
				]
			}
		];
		component.ngOnChanges();
		expect(component.queryString).toBe('');
		expect(component.topHashtags[0][0]).toBe('FOSSASIA');
		expect(component.topMentions[0][0]).toBe('mariobehling');
		expect(component.topFrequencyData).toBe(undefined);
		expect(component.areFrequencyDataAvailable).toBe(true);
		expect(component.topTwitterers.length).toBe(1);
	}));

	it('should give valid result on empty ApiResponseResult', async(() => {
		const fixture = TestBed.createComponent(InfoBoxComponent);
		const component = fixture.debugElement.componentInstance;

		component.ApiResponseResult = [
			{
				hashtags: [],
				screen_name: [],
				user: {},
				mentions: [],
				created_at: []
			}
		];
		component.ngOnChanges();
		expect(component.queryString).toBe('');
		expect(component.areTopHashtagsAvailable).toBe(undefined);
		expect(component.areTopMentionsAvailable).toBe(false);
		expect(component.topFrequencyData).toBe(undefined);
		expect(component.areFrequencyDataAvailable).toBe(false);
		expect(component.areTopTwitterersAvailable).toBe(undefined);
	}));

	it('should call inviewtwitters() and inviewmentions()', async(() => {
		const fixture = TestBed.createComponent(InfoBoxComponent);
		const component = fixture.debugElement.componentInstance;
		const event = {
			value: true
		};
		component.inviewtwitters(event);
		component.inviewmentions(event);
		expect(component.inviewporttwitters).toBe(true);
		expect(component.inviewportmentions).toBe(true);
	}));
});
