/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { FeedAdvancedSearchComponent } from './feed-advanced-search.component';
import {
	MatButtonToggleModule,
	MatMenuModule,
	MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromRoot from '../../reducers';

describe('Component: FeedAdvancedSearchComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				MatButtonToggleModule,
				MatMenuModule,
				MatIconModule,
				FormsModule,
				StoreModule.forRoot(fromRoot.reducers)
			],
			declarations: [
				FeedAdvancedSearchComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

	it('should have an toolList', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector('.wrapper .tools .tool-list')).toBeTruthy();
	}));

	it('should set toolList on ngOnInit() and blank query', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.ngOnInit();
		expect(component.toolList.inert).toBe(true);
		const query$ = component.store.select(fromRoot.getQuery);
		let displayString: string;
		const subscription = query$.subscribe(query => displayString = query.displayString);
		expect(displayString).toBe('');
		subscription.unsubscribe();
	}));

	it('should set showTools to true on calling toggleSearchTools()', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.ngOnInit();
		component.toggleSearchTools();

		expect(component.showTools).toBe(true);
	}));

	it('should call getFilterResults(all)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getFilterResults('all');

		expect(component.selectedTab).toBe('all');
	}));

	it('should call getFilterResults(image)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getFilterResults('image');

		expect(component.selectedTab).toBe('image');
	}));

	it('should call getFilterResults(news)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getFilterResults('news');

		expect(component.selectedTab).toBe('news');
	}));

	it('should call getFilterResults(video)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getFilterResults('video');

		expect(component.selectedTab).toBe('video');
	}));

	it('should call getFilterResults(else)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getFilterResults('else');

		expect(component.selectedTab).toBe('all');
	}));

	it('should call getTimeBoundResults(any)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getTimeBoundResults('any');

		expect(component.timeBoundValue).toBe('Any time');
	}));

	it('should call getTimeBoundResults(lastDay)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getTimeBoundResults('lastDay');

		expect(component.timeBoundValue).toBe('Past 24 hours');
	}));

	it('should call getTimeBoundResults(lastWeek)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getTimeBoundResults('lastWeek');

		expect(component.timeBoundValue).toBe('Past week');
	}));

	it('should call getTimeBoundResults(else)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getTimeBoundResults('else');

		expect(component.timeBoundValue).toBe('Any time');
	}));

	it('should call getLocationBasedResults(all)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getLocationBasedResults('all');

		expect(component.locationValue).toBe('All Countries');
	}));

	it('should call getLocationBasedResults(India)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getLocationBasedResults('India');

		expect(component.locationValue).toBe('Country: India');
	}));

	it('should call getLocationBasedResults(China)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getLocationBasedResults('China');

		expect(component.locationValue).toBe('Country: China');
	}));

	it('should call getLocationBasedResults(US)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getLocationBasedResults('US');

		expect(component.locationValue).toBe('Country: US');
	}));

	it('should call getLocationBasedResults(UK)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getLocationBasedResults('UK');

		expect(component.locationValue).toBe('Country: UK');
	}));

	it('should call getLocationBasedResults(else)', async(() => {
		const fixture = TestBed.createComponent(FeedAdvancedSearchComponent);
		const component = fixture.debugElement.componentInstance;
		component.getLocationBasedResults('else');

		expect(component.locationValue).toBe('All Countries');
	}));
});
