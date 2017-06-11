import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiSearchEffects } from './api-search.effects';
import { SearchService } from '../services';
import { Observable } from 'rxjs/Observable';
import * as apiAction from '../actions/api';
import { ApiResponse } from '../models/api-response';
import { MockApiResponse, MockQuery } from '../shared/mocks/feedItem.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

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

	function setup(params?: {searchapiReturnValue: any}) {
		const searchService = TestBed.get(SearchService);
		if (params) {
			searchService.fetchQuery.and.returnValue(params.searchapiReturnValue);
		}

		return {
			runner: TestBed.get(EffectsRunner),
			apisearchEffects: TestBed.get(ApiSearchEffects)
		};
	}

	describe('search$', () => {
		it('should return a new apiAction.SearchCompleteSuccessAction, ' +
			'with the response, on success, after the de-bounce', fakeAsync(() => {
			const response = MockApiResponse;

			const {runner, apisearchEffects} = setup({searchapiReturnValue: Observable.of(response)});

			const expectedResult = new apiAction.SearchCompleteSuccessAction(response);
			runner.queue(new apiAction.SearchAction(MockQuery));

			let result = null;
			apisearchEffects.search$.subscribe(_result => result = _result);
			tick(399); // test debounce
			expect(result).toBe(null);
			tick(401);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new apiAction.SearchCompleteFailAction, ' +
			'if the search service throws', fakeAsync(() => {
			const {runner, apisearchEffects} = setup({searchapiReturnValue: Observable.throw(new Error())});

			const expectedResult = new apiAction.SearchCompleteFailAction('');
			runner.queue(new apiAction.SearchAction(MockQuery));

			let result = null;

			apisearchEffects.search$.subscribe(_result => result = _result);
			tick(399); // test debounce
			expect(result).toBe(null);
			tick(401);
			expect(result).toEqual(expectedResult);
		}));
	});
});

