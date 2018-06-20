import * as fromUserApiResponse from './api-user-response';
import * as userApiAction from '../actions/user-api';
import { MockUserResponse } from '../shared/mocks/userResponse.mock';

describe('ApiUserResponseReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromUserApiResponse.reducer(undefined, action);
			expect(result).toEqual(fromUserApiResponse.initialState);
		});
	});

	describe('FETCH_USER_SUCCESS', () => {

		it('should add api response in the payload', () => {
			// should not replace existing Api Response
			const action = new userApiAction.UserSearchCompleteSuccessAction(MockUserResponse);

			const expectedResult = {
				user: MockUserResponse.user,
				followers: MockUserResponse.topology.followers,
				following: MockUserResponse.topology.following,
				valid: true
			};


			const result = fromUserApiResponse.reducer(fromUserApiResponse.initialState, action);
			expect(result).toEqual(expectedResult);
		});

	});

	describe('FETCH_USER_FAIL', () => {
		it('should set the validity of results to false', () => {
			const action = new userApiAction.UserSearchCompleteFailAction('');
			const result = fromUserApiResponse.reducer(fromUserApiResponse.initialState, action);

			const expectedResult = {
				user: null,
				followers: [],
				following: [],
				valid: false
			};

			expect(result).toEqual(expectedResult);
		});
	});

});
