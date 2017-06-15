import { createSelector } from 'reselect';
import { MediaWallsColor } from '../models/media-wall';
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

	describe('NEW_COLOR_ACCENT', () => {
		it('should set accent color from the payload', () => {
			const color = '#ffcc11';
			const action = new mediaWallAction.NewAccentColorAction(color);
			const result = fromMediaWall.reducer(fromMediaWall.initialState, action);
			expect(result.MediaWallColor.accent).toBe(color);
		});
	});

	describe('NEW_COLOR_BACKGROUND', () => {
		it('should set background color from the payload', () => {
			const color = '#ffffff';
			const action = new mediaWallAction.NewBackgroundColorAction(color);
			const result = fromMediaWall.reducer(fromMediaWall.initialState, action);
			expect(result.MediaWallColor.background).toBe(color);
		});
	});

	describe('NEW_COLOR_TEXT', () => {
		it('should set text color from the payload', () => {
			const color = '#666666';
			const action = new mediaWallAction.NewTextColorAction(color);
			const result = fromMediaWall.reducer(fromMediaWall.initialState, action);
			expect(result.MediaWallColor.text).toBe(color);
		});
	});
});
