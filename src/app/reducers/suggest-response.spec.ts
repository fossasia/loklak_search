import * as fromSuggestionResponse from './suggest-response';
import * as suggestAction from '../actions/suggest';
import { SuggestResponse } from '../models/api-suggest';
import { MockSuggestResponse } from '../shared/mocks/suggestResponse.mock';

describe('SuggestReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromSuggestionResponse.reducer(undefined, action);
			expect(result).toEqual(fromSuggestionResponse.initialState);
		});
	});

	describe('SUGGEST_COMPLETE_SUCCESS', () => {
		it('should add suggest response to the state', () => {
			const ResponseAction = new suggestAction.SuggestCompleteSuccessAction(MockSuggestResponse);
			const expectedResult: fromSuggestionResponse.State = {
				metadata: MockSuggestResponse.suggest_metadata,
				entities: MockSuggestResponse.queries,
				valid: true
			};

			const result = fromSuggestionResponse.reducer(fromSuggestionResponse.initialState, ResponseAction);
				expect(result).toEqual(expectedResult);
		});
	});

	describe('SUGGEST_COMPLETE_FAIL', () => {
		it('should set valid to true', () => {
			const action = new suggestAction.SuggestCompleteFailAction('');
			const result = fromSuggestionResponse.reducer(fromSuggestionResponse.initialState, action);

			expect(result.valid).toBe(false);
		});
	});

});
