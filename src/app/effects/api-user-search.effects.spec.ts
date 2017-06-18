import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ApiUserSearchEffects } from './api-user-search.effects';
import { UserService } from '../services';
import { Observable } from 'rxjs/Observable';
import * as userApiAction from '../actions/user-api';
import { ApiResponse } from '../models/api-response';
import { MockUserResponse, MockUserQuery } from '../shared/mocks/userResponse.mock';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


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
			}
		]
	}));

	function setup(params?: {userApiReturnValue: any}) {
		const userService = TestBed.get(UserService);
		if (params) {
			userService.fetchQuery.and.returnValue(params.userApiReturnValue);
		}

		return {
			runner: TestBed.get(EffectsRunner),
			apiUserSearchEffects: TestBed.get(ApiUserSearchEffects)
		};
	}

	describe('search$', () => {
		it('should return a new userApiAction.UserSearchCompleteSuccessAction, ' +
			'with the response, on success, after the de-bounce', fakeAsync(() => {
			const response = MockUserResponse;

			const {runner, apiUserSearchEffects} = setup({userApiReturnValue: Observable.of(response)});

			const expectedResult = new userApiAction.UserSearchCompleteSuccessAction(response);

			runner.queue(new userApiAction.UserSearchAction(MockUserQuery));

			let result = null;
			apiUserSearchEffects.search$.subscribe(_result => result = _result);
			tick(399); // test debounce
			expect(result).toBe(null);
			tick(401);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new userApiAction.UserSearchCompleteFailAction,' +
			'if the SearchService throws', fakeAsync(() => {
				const { runner, apiUserSearchEffects } = setup({ userApiReturnValue: Observable.throw(new Error()) });

				const expectedResult = new userApiAction.UserSearchCompleteFailAction('');

				runner.queue(new userApiAction.UserSearchAction(MockUserQuery));

				let result = null;
				apiUserSearchEffects.search$.subscribe(_result => result = _result );

				tick(399); // Test debounce
				expect(result).toBe(null);
				tick(401);
				expect(result).toEqual(expectedResult);
			}));
	});
});

