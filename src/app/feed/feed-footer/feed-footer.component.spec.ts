/* tslint:disable:no-unused-variable */
import { FeedFooterComponent } from './feed-footer.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component: FeedFooter', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				FeedFooterComponent
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(FeedFooterComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should sort apiResponseTags on ngOninit()', async(() => {
		const fixture = TestBed.createComponent(FeedFooterComponent);
		const component = fixture.debugElement.componentInstance;

		component.apiResponseTags = [
			{
				tag : 'tag1',
				count : 10
			},
			{
				tag : 'tag2',
				count : 5
			},
			{
				tag : 'tag3',
				count : 5
			},
			{
				tag : 'tag0',
				count : 10
			},
			{
				tag : 'tag1',
				count : 10
			},
		];
		component.ngOnInit();
		expect(component.sortedApiResponseTags[0].tag).toBe('tag2');
		expect(component.sortedApiResponseTags[1].tag).toBe('tag3');
		expect(component.sortedApiResponseTags[2].tag).toBe('tag0');
		expect(component.sortedApiResponseTags[3].tag).toBe('tag1');
		expect(component.sortedApiResponseTags[4].tag).toBe('tag1');
	}));
});
