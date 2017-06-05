import * as fromSearch from './search';
import * as apiAction from '../actions/api';
import { Query, ReloactionAfterQuery } from '../models/query';
import { MockQuery, MockApiResponse } from '../shared/mocks/feedItem.mock';

describe('SearchReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;
			const result = fromSearch.reducer(undefined, action);
			expect(result).toEqual(fromSearch.initialState);
		});
	});

	describe('SEARCH', () => {
		it('should set loading to true and change the query property', () => {
			const action = new apiAction.SearchAction(MockQuery);
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.loading).toBe(true);
			expect(result.query).toBe(MockQuery);
		});
	});

	describe('FETCH_USER', () => {
		it('should set loading to true and change the query property', () => {
			const action = new apiAction.FetchUserAction(MockQuery);
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.loading).toBe(true);
			expect(result.query).toBe(MockQuery);
		});
	});

	describe('SEARCH_COMPLETE_SUCCESS', () => {
		it('should set loading to false', () => {
			const action = new apiAction.SearchCompleteSuccessAction(MockApiResponse);
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.loading).toBe(false);
		});
	});

	describe('SEARCH_COMPLETE_FAIL', () => {
		it('should set loading to false', () => {
			const action = new apiAction.SearchCompleteFailAction('');
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.loading).toBe(false);
		});
	});

	describe('SHOW_SEARCH_RESULTS', () => {
		it('should set showUserFeed to false', () => {
			const action = new apiAction.ShowSearchResults('');
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.showUserFeed).toBe(false);
		});
	});

	describe('SHOW_USER_FEED', () => {
		it('should set showUserFeed to true', () => {
			const action = new apiAction.ShowUserFeed('');
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.showUserFeed).toBe(true);
		});
	});
});
