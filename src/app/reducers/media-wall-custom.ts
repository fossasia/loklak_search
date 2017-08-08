import { createSelector } from 'reselect';
import * as mediaWallCustomAction from '../actions/media-wall-custom';
import { WallHeader, WallBackground, WallCard } from '../models';

export interface State {
	wallHeader: WallHeader;
	wallBackground: WallBackground;
	wallCard: WallCard;
}

export const initialState: State = {
	wallHeader: {
		backgroundColor: '#3C8DBC',
		fontColor: '#FFFFFF'
	},
	wallBackground: {
		backgroundColor: '#F5F8FA'
	},
	wallCard: {
		fontColor: '#3C3338',
		backgroundColor: '#FFFFFF',
		accentColor: '#639BC4'
	}
};

export function reducer(state: State = initialState, action: mediaWallCustomAction.Actions): State {
	switch (action.type) {

		case mediaWallCustomAction.ActionTypes.WALL_HEADER_PROPERTIES_CHANGE: {
			const wallHeader = action.payload;

			return Object.assign({}, state, {
				wallHeader
			});
		}

		case mediaWallCustomAction.ActionTypes.WALL_BACKGROUND_PROPERTIES_CHANGE: {
			const wallBackground = action.payload;

			return Object.assign({}, state, {
				wallBackground
			});
		}

		case mediaWallCustomAction.ActionTypes.WALL_CARD_PROPERTIES_CHANGE: {
			const wallCard = action.payload;

			return Object.assign({}, state, {
				wallCard
			});
		}

		case mediaWallCustomAction.ActionTypes.WALL_LIGHT_THEME_CHANGE: {
			state = {
				wallHeader: {
					backgroundColor: '#fff',
					fontColor: '#337ab7'
				},
				wallBackground: {
					backgroundColor: '#fafafa'
				},
				wallCard: {
					fontColor: '#333',
					backgroundColor: '#fff',
					accentColor: '#0084b4'
				}
			}

			return state;
		}

		case mediaWallCustomAction.ActionTypes.WALL_DARK_THEME_CHANGE: {
			state = {
				wallHeader: {
					backgroundColor: '#243447',
					fontColor: '#FFFFFF'
				},
				wallBackground: {
					backgroundColor: '#2C4158'
				},
				wallCard: {
					fontColor: '#FFFFFF',
					backgroundColor: '#1B2836',
					accentColor: '#1c94e0'
				}
			}
			return state;
		}

		case mediaWallCustomAction.ActionTypes.WALL_CLASSIC_THEME_CHANGE: {
			state = initialState;

			return state;
		}

		case mediaWallCustomAction.ActionTypes.WALL_COOL_BLUES_THEME_CHANGE: {
			state = {
				wallHeader: {
					backgroundColor: '#00222d',
					fontColor: '#FFFFFF'
				},
				wallBackground: {
					backgroundColor: '#015D86'
				},
				wallCard: {
					fontColor: '#FFFFFF',
					backgroundColor: '#044167',
					accentColor: '#9ae5fa'
				}
			}

			return state;
		}

		default: {
			return state;
		}
	}
}

export const getCustomWallHeader = (state: State) => state.wallHeader;

export const getCustomWallBackground = (state: State) => state.wallBackground;

export const getCustomWallCard = (state: State) => state.wallCard;
