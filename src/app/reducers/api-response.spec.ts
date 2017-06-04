import * as fromApiResponse from './api-response';
import * as apiAction from '../actions/api';
import * as paginationAction from '../actions/pagination';
import { ApiResponse,
				ApiResponseResult,
				ApiResponseMetadata,
				ApiResponseUser,
				ApiResponseAggregations } from '../models/api-response';
import { MockApiResponse } from '../shared/mocks/feedItem.mock';

describe('ApiResponseReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromApiResponse.reducer(undefined, action);
			expect(result).toEqual(fromApiResponse.initialState);
		});
	});

	describe('SEARCH_COMPLETE_SUCCESS', () => {

		function noExistingResponse(action) {
			const ResponseAction = new action(MockApiResponse);
			const tagStrings = [].concat(...MockApiResponse.statuses.map(item => item.hashtags));
			const hashtags = Array.from(new Set(tagStrings)).map(tag => {
					return { tag, count: tagStrings.filter(y => y === tag).length };
			});

			const expectedResult = {
				pages: [MockApiResponse],
				entities: MockApiResponse.statuses,
				aggregations: MockApiResponse.aggregations,
				hashtags: hashtags,
				valid: true,
				selected: null,
				selectedavail: false
			};

			const result = fromApiResponse.reducer(fromApiResponse.initialState, ResponseAction);
				expect(result).toEqual(expectedResult);
			}

		function existingResponse(action) {

			const initialhashtags = [ {tag: 'loklak', count: 1} ];
			const tagStrings = [].concat(...MockApiResponse.statuses.map(item => item.hashtags));
			const hashtags = Array.from(new Set(tagStrings)).map(tag => {
					return { tag, count: tagStrings.filter(y => y === tag).length };
			});

			const initialState = {
				pages: [MockApiResponse, MockApiResponse],
				entities: [...MockApiResponse.statuses, ...MockApiResponse.statuses],
				aggregations: MockApiResponse.aggregations,
				hashtags: initialhashtags,
				valid: false,
				selected: 2,
				selectedavail: true
			};
			// should not replace existing Api Response
			const ResponseAction = new action(MockApiResponse);

			const expectedResult = {
				pages: [MockApiResponse],
				entities: MockApiResponse.statuses,
				aggregations: MockApiResponse.aggregations,
				hashtags: hashtags,
				valid: true,
				selected: null,
				selectedavail: false
			};


			const result = fromApiResponse.reducer(initialState, ResponseAction);
			expect(result).toEqual(expectedResult);
		}

		it('should add api response in the payload when none exist', () => {
			noExistingResponse(apiAction.SearchCompleteSuccessAction);
		});

		it('should add new api response when response already exist', () => {
			existingResponse(apiAction.SearchCompleteSuccessAction);
		});
	});

	describe('SEARCH_COMPLETE_FAIL', () => {
		it('should set valid to false', () => {
			const action = new apiAction.SearchCompleteFailAction('');
			const result = fromApiResponse.reducer(fromApiResponse.initialState, action);
			expect(result.valid).toBe(false);
		});
	});

	describe('PAGINATION_COMPLETE_SUCCESS', () => {
		function existingResponse(action) {

			const initialhashtags = [ {tag: 'loklak', count: 1} ];
			const oldTagStrings = initialhashtags.map(hashtag => hashtag.tag);
			const tagStrings = oldTagStrings.concat(...MockApiResponse.statuses.map(item => item.hashtags));
			const hashtags = Array.from(new Set(tagStrings)).map(tag => {
					return { tag, count: tagStrings.filter(y => y === tag).length };
			});

			const initialState = {
				pages: [ MockApiResponse ],
				entities: MockApiResponse.statuses,
				aggregations: MockApiResponse.aggregations,
				hashtags: initialhashtags,
				valid: false,
				selected: 2,
				selectedavail: true
			};
			// should not replace existing Api Response
			const ResponseAction = new action(MockApiResponse);

			const expectedResult = {
				pages: [MockApiResponse, MockApiResponse],
				entities: [...MockApiResponse.statuses, ...MockApiResponse.statuses],
				aggregations: MockApiResponse.aggregations,
				hashtags: [...hashtags],
				valid: true,
				selected: 2,
				selectedavail: true
			};


			const result = fromApiResponse.reducer(initialState, ResponseAction);
			expect(result).toEqual(expectedResult);
		}

		it('should add new api response through pagination when response already exist', () => {
			existingResponse(paginationAction.PaginationCompleteSuccessAction);
		});
	});

	describe('PAGINATION_COMPLETE_FAIL', () => {
		it('should not change the state', () => {
			const initialState = fromApiResponse.initialState;
			const expectedResult = fromApiResponse.initialState;
			const action = new paginationAction.PaginationCompleteFailAction('');
			const result = fromApiResponse.reducer(fromApiResponse.initialState, action);
			expect(expectedResult).toBe(initialState);
		});
	});

	describe('SELECT_RESULT', () => {
		it('should set selectavail to true and make selected to be the payload', () => {
			const action = new apiAction.SelectLightbox(1);
			const result = fromApiResponse.reducer(fromApiResponse.initialState, action);
			expect(result.selectedavail).toBe(true);
			expect(result.selected).toBe(1);
		});
	});

	describe('UNSELECT_RESULT', () => {
		it('should set selectavail to false and make selected to be null', () => {
			const action = new apiAction.UnSelectLightbox(null);
			const result = fromApiResponse.reducer(fromApiResponse.initialState, action);
			expect(result.selectedavail).toBe(false);
			expect(result.selected).toBe(null);
		});
	});

});
