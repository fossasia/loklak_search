import { createSelector } from 'reselect';
import * as mediaWallDesignAction from '../actions/media-wall-design';

export interface State {
	displayHeader: boolean;
	headerTitle: string;
	columnCount: string;
	count: number;
	cardStyle: string;
}

export const initialState: State = {
	displayHeader: true,
	headerTitle: '',
	columnCount: '',
	count: 1,
	cardStyle: 'Fluid'
};

export function reducer(state: State = initialState, action: mediaWallDesignAction.Actions): State {
	switch (action.type) {

		case mediaWallDesignAction.ActionTypes.WALL_DISPLAY_HEADER_ACTION: {
			const displayHeader = action.payload;

			return Object.assign({}, state, {
				displayHeader
			});
		}

		case mediaWallDesignAction.ActionTypes.WALL_HEADER_TITLE_CHANGE: {
			const headerTitle = action.payload;

			return Object.assign({}, state, {
				headerTitle
			});
		}

		case mediaWallDesignAction.ActionTypes.WALL_COLUMN_COUNT_CHANGE_ACTION: {
			const payload = action.payload;

			return Object.assign({}, state, {
				columnCount: payload
			});
		}

		case mediaWallDesignAction.ActionTypes.WALL_COUNT_CHANGE_ACTION: {
			const payload = action.payload;
			let count: number;
			if (typeof(payload) === 'string' ) {
				count = parseInt(payload, 10);
			}

			return Object.assign({}, state, {
				count
			});
		}

		case mediaWallDesignAction.ActionTypes.WALL_CARD_STYLE_CHANGE_ACTION: {
			const cardStyle = action.payload;

			return Object.assign({}, state, {
				cardStyle
			});
		}

		default: {
			return state;
		}
	}
}

export const getWallDisplayHeader = (state: State) => state.displayHeader;

export const getWallHeaderTitle = (state: State) => state.headerTitle;

export const getWallColumnCount = (state: State) => state.columnCount;

export const getWallCount = (state: State) => state.count;

export const getWallCardStyle = (state: State) => state.cardStyle;
