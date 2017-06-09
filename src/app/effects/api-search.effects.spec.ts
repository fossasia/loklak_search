import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiSearchEffects } from './api-search.effects';
import { SearchService } from '../services';
import { Observable } from 'rxjs/Observable';
import * as apiAction from '../actions/api';
import { ApiResponse } from '../models/api-response';
import { MockApiResponse } from '../shared/mocks/feedItem.mock';
import { Query, ReloactionAfterQuery } from '../models';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';




const query: Query = {
	queryString: 'from:fossasia',
	location: ReloactionAfterQuery.RELOCATE
};

describe('ApiSearchEffects', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule,
			RouterTestingModule
		],
		providers: [
			ApiSearchEffects,
			{
				provide: SearchService,
				useValue: jasmine.createSpyObj('searchService', ['fetchQuery'])
			},
			Location
		]
	}));

	function setup(params?: {searchApiReturnValue: any}) {
		const searchService = TestBed.get(SearchService);
		if (params) {
			searchService.fetchQuery.and.returnValue(params.searchApiReturnValue);
		}

		return {
			runner: TestBed.get(EffectsRunner),
			apiSearchEffects: TestBed.get(ApiSearchEffects)
		};
	}

	describe('search$', () => {
		it('should return a new apiAction.SearchCompleteSuccessAction, ' +
			'with the response, on success, after the de-bounce', fakeAsync(() => {
			const response = MockApiResponse;

			const {runner, apiSearchEffects} = setup({searchApiReturnValue: Observable.of(response)});

			const expectedResult = new apiAction.SearchCompleteSuccessAction(response);
			runner.queue(new apiAction.SearchAction(query));

			let result = null;
			const subscription = apiSearchEffects.search$.subscribe(_result => result = _result);
			tick(199); // test debounce
			expect(result).toBe(null);
			tick(200);
			expect(result).toEqual(expectedResult);
			subscription.unsubscribe();
		}));

		it('should return a new apiAction.SearchCompleteFailAction, ' +
			'if the search service throws', fakeAsync(() => {
			const {runner, apiSearchEffects} = setup({searchApiReturnValue: Observable.throw(new Error())});

			const expectedResult = new apiAction.SearchCompleteFailAction('');
			runner.queue(new apiAction.SearchAction(query));

			let result = null;

			const subscription = apiSearchEffects.search$.subscribe(_result => result = _result);
			tick(199); // test debounce
			expect(result).toBe(null);
			tick(200);
			expect(result).toEqual(expectedResult);
			subscription.unsubscribe();
		}));
	});
});

