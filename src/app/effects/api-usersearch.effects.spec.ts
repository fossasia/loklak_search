
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiUserSearchEffects } from './api-usersearch.effects';
import { UserService } from '../services';
import { Observable } from 'rxjs/Observable';
import * as apiAction from '../actions/api';
import { ApiResponse } from '../models/api-response';
import { MockUserResponse } from '../shared/mocks/userResponse.mock';
import { Query, ReloactionAfterQuery } from '../models';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';


import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

const query: Query = {
	queryString: 'from:fossasia',
	location: ReloactionAfterQuery.RELOCATE
};

describe('ApiUserSearchEffects', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			EffectsTestingModule,
			RouterTestingModule
		],
		providers: [
			ApiUserSearchEffects,
			{
				provide: UserService,
				useValue: jasmine.createSpyObj('userService', ['fetchQuery'])
			},
			Location
		]
	}));

	function setup(params?: {userapiReturnValue: any}) {
		const userService = TestBed.get(UserService);
		if (params) {
			userService.fetchQuery.and.returnValue(params.userapiReturnValue);
		}

		return {
			runner: TestBed.get(EffectsRunner),
			apiusersearchEffects: TestBed.get(ApiUserSearchEffects)
		};
	}

	describe('search$', () => {
		it('should return a new apiAction.FetchUserSuccessAction, ' +
			'with the response, on success, after the de-bounce', fakeAsync(() => {
			const response = MockUserResponse;

			const {runner, apiusersearchEffects} = setup({userapiReturnValue: Observable.of(response)});

			const expectedResult = new apiAction.FetchUserSuccessAction(response);

			runner.queue(new apiAction.FetchUserAction(query));

			let result = null;
			apiusersearchEffects.search$.subscribe(_result => result = _result);
			tick(199); // test debounce
			expect(result).toBe(null);
			tick(200);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new apiAction.FetchUserFailAction, ' +
			'if the search service throws', fakeAsync(() => {
			const {runner, apiusersearchEffects} = setup({userapiReturnValue: Observable.throw(new Error())});

			const expectedResult = new apiAction.FetchUserFailAction('');
			runner.queue(new apiAction.FetchUserAction(query));

			let result = null;

			apiusersearchEffects.search$.subscribe(_result => result = _result);
			tick(199); // test debounce
			expect(result).toBe(null);
			tick(200);
			expect(result).toEqual(expectedResult);
		}));
	});
});

