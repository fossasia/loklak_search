import * as fromPaginationResponse from './pagination';
import * as paginationAction from '../actions/pagination';
import { ApiResponse,
				ApiResponseResult,
				ApiResponseMetadata,
				ApiResponseUser,
				ApiResponseAggregations } from '../models/api-response';
import { MockApiResponse } from '../shared/mocks/feedItem.mock';

describe('PaginationReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromPaginationResponse.reducer(undefined, action);
			expect(result).toEqual(fromPaginationResponse.initialState);
		});
	});

	describe('NEXT_PAGE', () => {
		it('should increment page property by 1 and set pageLoading to true', () => {
			const action = new paginationAction.NextPageAction('');
			const result = fromPaginationResponse.reducer(fromPaginationResponse.initialState, action);
			expect(result.page).toBe(1);
			expect(result.pageLoading).toBe(true);
			});
		});

	describe('PAGINATION_COMPLETE_SUCCESS', () => {
		it('should set pageLoading to false and set pagesAvailable accordingly', () => {
			const action = new paginationAction.PaginationCompleteSuccessAction(MockApiResponse);
			const result = fromPaginationResponse.reducer(fromPaginationResponse.initialState, action);
			expect(result.pageLoading).toBe(false);
			expect(result.pagesAvailable).toBe(false);
		});
	});

	describe('PAGINATION_COMPLETE_FAIL', () => {
		it('should setpageLoading to false and ' +
			'set pagesAvailable to false and decrement page property by 1', () => {
				const action = new paginationAction.PaginationCompleteFailAction('');
				const initialState = {
					page: 1,
					pageLoading: false,
					pagesAvailable: true
				};
				const result = fromPaginationResponse.reducer(initialState, action);
				expect(result.pageLoading).toBe(false);
				expect(result.pagesAvailable).toBe(false);
				expect(result.page).toBe(0);
			});
	});

	describe('REVERT_PAGINATION_STATE', () => {
		it('should set pageLoading to false and set pagesAvailable to true', () => {
			const action = new paginationAction.RevertPaginationState('');
			const initialState = {
					page: 1,
					pageLoading: true,
					pagesAvailable: false
				};
			const result = fromPaginationResponse.reducer(initialState, action);
			expect(result.pageLoading).toBe(false);
			expect(result.pagesAvailable).toBe(true);
		});
	});
});
