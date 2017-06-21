import { createSelector } from 'reselect';
import * as mediaWallAction from '../actions/media-wall';
import * as apiAction from '../actions/api';
import { ApiResponse } from '../models/api-response';
import * as fromMediaWall from './media-wall';
import { MockApiResponse } from '../shared/mocks/feedItem.mock';

describe('MediaWallReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromMediaWall.reducer(undefined, action);
			expect(result).toEqual(fromMediaWall.initialState);
		});
	});

	describe('WALL_INPUT_VALUE_CHANGE', () => {
		it('should set change the querString', () => {
			const queryString = 'fossasia';
			const action = new mediaWallAction.WallInputValueChangeAction(queryString);
			const result = fromMediaWall.reducer(fromMediaWall.initialState, action);
			expect(result.query.queryString).toBe(queryString);
		});
	});
});
