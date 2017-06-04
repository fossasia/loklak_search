import * as fromUserApiResponse from './api-user-response';
import * as apiAction from '../actions/api';
import { UserApiResponse } from '../models/api-user-response';
import { MockUserResponse } from '../shared/mocks/userResponse.mock';
import { MockQuery } from '../shared/mocks/feedItem.mock';

describe('ApiUserResponseReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromUserApiResponse.reducer(undefined, action);
			expect(result).toEqual(fromUserApiResponse.initialState);
		});
	});

	describe('SEARCH', () => {
		it('should set showUserInfo to false ,set loading to true and make user null', () => {
			const query = MockQuery;
			const action = new apiAction.SearchAction(query);
			const result = fromUserApiResponse.reducer(fromUserApiResponse.initialState, action);
			expect(result.showUserInfo).toBe(false);
			expect(result.loading).toBe(true);
			expect(result.user).toBe(null);
		});
	});

	describe('FETCH_USER', () => {
		it('should set showUserInfo to true and set loading to true', () => {
			const query = MockQuery;
			const action = new apiAction.FetchUserAction(query);
			const result = fromUserApiResponse.reducer(fromUserApiResponse.initialState, action);
			expect(result.showUserInfo).toBe(true);
			expect(result.loading).toBe(true);
		});
	});

	describe('FETCH_USER_SUCCESS', () => {

				it('should add api response in the payload', () => {
			// should not replace existing Api Response
			const action = new apiAction.FetchUserSuccessAction(MockUserResponse);

			const expectedResult = {
				user: MockUserResponse.user,
				followers: MockUserResponse.topology.followers,
				following: MockUserResponse.topology.following,
				showUserInfo: false,
				loading: false
			};


			const result = fromUserApiResponse.reducer(fromUserApiResponse.initialState, action);
			expect(result).toEqual(expectedResult);
		});

	});

	describe('FETCH_USER_FAIL', () => {
		it('should set loading to false and showuserInfo to false', () => {
			const action = new apiAction.FetchUserFailAction('');
			const result = fromUserApiResponse.reducer(fromUserApiResponse.initialState, action);
			expect(result.loading).toBe(false);
			expect(result.showUserInfo).toBe(false);
		});
	});

});
