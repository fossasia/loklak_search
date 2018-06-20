import * as fromSearch from './search';
import * as apiAction from '../actions/api';
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
		it('should set loading to true', () => {
			const action = new apiAction.SearchAction(MockQuery);
			const result = fromSearch.reducer(fromSearch.initialState, action);
			expect(result.loading).toBe(true);
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
});
