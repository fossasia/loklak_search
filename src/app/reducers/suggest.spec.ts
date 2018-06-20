import * as fromSuggestion from './suggest';
import * as suggestAction from '../actions/suggest';
import { MockQuery } from '../shared/mocks/feedItem.mock';
import { MockSuggestResponse } from '../shared/mocks/suggestResponse.mock';

describe('SuggestReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromSuggestion.reducer(undefined, action);
			expect(result).toEqual(fromSuggestion.initialState);
		});
	});

	describe('SUGGEST', () => {
		it('should set loading to true and change the query property', () => {
			const mockQuery = 'loklak';

			const action = new suggestAction.SuggestAction(mockQuery);
			const result = fromSuggestion.reducer(fromSuggestion.initialState, action);
			expect(result.loading).toBe(true);
			expect(result.query.queryString).toBe(mockQuery);
		});
	});

	describe('SUGGEST_COMPLETE_SUCCESS', () => {
		it('should set loading to false', () => {
			const action = new suggestAction.SuggestCompleteSuccessAction(MockSuggestResponse);
			const result = fromSuggestion.reducer(fromSuggestion.initialState, action);
			expect(result.loading).toBe(false);
		});
	});

	describe('SUGGEST_COMPLETE_FAIL', () => {
		it('should set loading to false', () => {
			const initialState = {
			query: MockQuery,
			loading: true
			};
			const action = new suggestAction.SuggestCompleteFailAction('');
			const result = fromSuggestion.reducer(initialState, action);
			expect(result.loading).toBe(false);
		});
	});

});
