
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PaginationEffects } from './pagination.effects';
import { SearchService } from '../services';
import { Observable } from 'rxjs/Observable';
import * as apiAction from '../actions/api';
import * as paginationAction from '../actions/pagination';
import { ApiResponse } from '../models/api-response';
import { MockApiResponse } from '../shared/mocks/feedItem.mock';
import { Query, ReloactionAfterQuery } from '../models';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../reducers';


import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const query: Query = {
	queryString: 'fossasia',
	location: ReloactionAfterQuery.RELOCATE
};

describe('PaginationEffects', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule,
			StoreModule.provideStore(reducer)
		],
		providers: [
			PaginationEffects,
			{
				provide: SearchService,
				useValue: jasmine.createSpyObj('searchService', ['fetchQuery'])
			}
		]
	}));

	function setup(params?: {searchapiReturnValue: any}) {
		const searchService = TestBed.get(SearchService);
		if (params) {
			searchService.fetchQuery.and.returnValue(params.searchapiReturnValue);
		}

		return {
			runner: TestBed.get(EffectsRunner),
			paginationEffects: TestBed.get(PaginationEffects)
		};
	}

	describe('pagination$', () => {
		it('should return a new paginationAction.PaginationCompleteSuccessAction, ' +
			'with the response, on success', fakeAsync(() => {
			const response = MockApiResponse;

			const {runner, paginationEffects} = setup({searchapiReturnValue: Observable.of(response)});

			const expectedResult = new paginationAction.PaginationCompleteSuccessAction(response);

			runner.queue(new paginationAction.NextPageAction(query));

			let result = null;
			paginationEffects.pagination$.subscribe(_result => result = _result);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new paginationAction.PaginationCompleteFailAction, ' +
			'if the search service throws', fakeAsync(() => {
			const {runner, paginationEffects} = setup({searchapiReturnValue: Observable.throw(new Error())});

			const expectedResult = new paginationAction.PaginationCompleteFailAction('');
			runner.queue(new paginationAction.NextPageAction(query));

			let result = null;

			paginationEffects.pagination$.subscribe(_result => result = _result);
			expect(result).toEqual(expectedResult);
		}));
	});
});

