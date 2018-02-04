import * as mediaWallAction from '../actions/media-wall-query';
import * as fromMediaWall from './media-wall-query';

describe('MediaWallReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromMediaWall.reducer(undefined, action);
			expect(result).toEqual(fromMediaWall.initialState);
		});
	});

	describe('WALL_QUERY_CHANGE', () => {
		it('should set change the querString', () => {
			const queryString = 'fossasia';
			const action = new mediaWallAction.WallInputValueChangeAction(queryString);
			const result = fromMediaWall.reducer(fromMediaWall.initialState, action);
			expect(result.query.displayString).toBe(queryString);
		});
	});
});
