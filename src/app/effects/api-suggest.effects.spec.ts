
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SuggestEffects } from './api-suggest.effects';
import { SuggestService } from '../services';
import { Observable } from 'rxjs/Observable';
import * as suggestAction from '../actions/suggest';
import { SuggestResponse } from '../models/api-suggest';
import { MockSuggestResponse } from '../shared/mocks/suggestResponse.mock';
import { Query, ReloactionAfterQuery } from '../models';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const query: Query = {
	queryString: 'from:fossasia',
	location: ReloactionAfterQuery.NONE
};

describe('SuggestEffects', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule,
			RouterTestingModule
		],
		providers: [
			SuggestEffects,
			{
				provide: SuggestService,
				useValue: jasmine.createSpyObj('suggestService', ['fetchQuery']),
			},
			Location
		]
	}));

	function setup(params?: {suggestapiReturnValue: any}) {
		const suggestService = TestBed.get(SuggestService);
		if (params) {
			suggestService.fetchQuery.and.returnValue(params.suggestapiReturnValue);
		}

		return {
			runner: TestBed.get(EffectsRunner),
			apisuggestEffects: TestBed.get(SuggestEffects)
		};
	}

	describe('suggest$', () => {
		it('should return a new suggestAction.SuggestCompleteSuccessAction, ' +
			'with the response, on success, after the de-bounce', fakeAsync(() => {
			const response = MockSuggestResponse;

			const {runner, apisuggestEffects} = setup({suggestapiReturnValue: Observable.of(response)});

			const expectedResult = new suggestAction.SuggestCompleteSuccessAction(response);

			runner.queue(new suggestAction.SuggestAction(query));

			let result = null;
			apisuggestEffects.suggest$.subscribe(_result => result = _result);
			tick(199); // test debounce
			expect(result).toBe(null);
			tick(200);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new suggestAction.SuggestCompleteFailAction, ' +
			'if the suggest service throws', fakeAsync(() => {
			const {runner, apisuggestEffects} = setup({suggestapiReturnValue: Observable.throw(new Error())});

			const expectedResult = new suggestAction.SuggestCompleteFailAction('');
			runner.queue(new suggestAction.SuggestAction(query));

			let result = null;

			apisuggestEffects.suggest$.subscribe(_result => result = _result);
			tick(199); // test debounce
			expect(result).toBe(null);
			tick(200);
			expect(result).toEqual(expectedResult);
		}));
	});
});

