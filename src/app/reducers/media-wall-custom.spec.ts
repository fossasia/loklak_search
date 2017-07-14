import { createSelector } from 'reselect';
import * as fromMediaWallCustom from './media-wall-custom';
import * as mediaWallCustomAction from '../actions/media-wall-custom';
import { WallHeader, WallBackground, WallCard } from '../models';

describe('MediaWallCustomReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;

			const result = fromMediaWallCustom.reducer(undefined, action);
			expect(result).toEqual(fromMediaWallCustom.initialState);
		});
	});

	describe('WALL_HEADER_PROPERTIES_CHANGE', () => {
		it('should set change the wall header state properties', () => {
			const newWallHeader: WallHeader = {
				backgroundColor: '#fff',
				fontColor: '#24292E'
			};
			const action = new mediaWallCustomAction.WallHeaderPropertiesChangeAction(newWallHeader);
			const result = fromMediaWallCustom.reducer(fromMediaWallCustom.initialState, action);
			expect(result.wallHeader).toBe(newWallHeader);
		});
	});

	describe('WALL_BACKGROUND_PROPERTIES_CHANGE', () => {
		it('should set change the wall background state properties', () => {
			const newWallBackground: WallBackground = {
				backgroundColor: '#FAFBFC',
			};
			const action = new mediaWallCustomAction.WallBackgroundPropertiesChangeAction(newWallBackground);
			const result = fromMediaWallCustom.reducer(fromMediaWallCustom.initialState, action);
			expect(result.wallBackground).toBe(newWallBackground);
		});
	});

		describe('WALL_CARD_PROPERTIES_CHANGE', () => {
		it('should set change the wall card state properties', () => {
			const newWallCard: WallCard = {
				fontColor: '#E6FFED',
				backgroundColor: '#247EC9',
				accentColor: '#16A765'
			};
			const action = new mediaWallCustomAction.WallCardPropertiesChangeAction(newWallCard);
			const result = fromMediaWallCustom.reducer(fromMediaWallCustom.initialState, action);
			expect(result.wallCard).toBe(newWallCard);
		});
	});
});
