/* tslint:disable:no-unused-variable */
import { FeedLinkerComponent } from './feed-linker.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component: FeedLinker', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedLinkerComponent
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(FeedLinkerComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should call generateAllShards() when useAll is true', async(() => {
		const fixture = TestBed.createComponent(FeedLinkerComponent);
		const component = fixture.debugElement.componentInstance;

		component.useAll = true;
		component.text = 'loklak @fossasia #loklak http://loklak.org/';
		component.ngOnInit();
		expect(component.shardArray.length).toBe(4);
	}));

	it('should call generateShards() when useAll is false', async(() => {
		const fixture = TestBed.createComponent(FeedLinkerComponent);
		const component = fixture.debugElement.componentInstance;

		component.useAll = false;
		component.hashtags = [
			'FOSSASIA',
			'loklak'
		];
		component.mentions = [
			'loklak'
		];
		component.links = [
			'http://loklak.org/',
			'https://github.com/fossasia/loklak_search'
		];
		component.text = 'loklak @fossasia #loklak http://loklak.org/';
		component.ngOnInit();
		expect(component.shardArray.length).toBe(4);
	}));
});
