import { createSelector } from 'reselect';

import * as api from '../actions/api';
/**
 * Each reducer module must import the local `State` which it controls.
 *
 * Here the `State` contains three properties:
 * @prop [all: boolean] shows that all results are to be displayed
 * @prop [images: boolean] shows that only results with images are to be displayed
 * @prop [videos: boolean] shows that only results with videos are to be displayed
 * @prop [news: boolean] shows that only results from news resources are to be displayed
 */
export interface State {
	all: boolean;
	images: boolean;
	videos: boolean;
	news: boolean;
}

/**
 * There is always a need of initial state to be passed onto the store.
 *
 * @prop: all: true
 * @prop: images: false
 * @prop: videos: false
 * @prop: news: false
 */
const initialState: State = {
	all: true,
	images: false,
	videos: false,
	news: false
};


/**
 * The actual reducer function. Reducers can be thought of as the tables in the DataBase.
 * These are the functions which are responsible for maintaing, and updating the
 * `State` of the application they control.
 *
 * Here the reducer controls the part of state which is responsilble for storing the
 * information about what specific type of media search user wants to search for
 */
export function reducer(state: State = initialState, action: api.Actions): State {
	switch (action.type) {
		case api.ActionTypes.SEARCH_ALL_FEEDS: {

			return Object.assign({}, state, {
				all: true,
				images: false,
				videos: false,
				news: false

			});
		}

		case api.ActionTypes.SEARCH_IMAGES_FEEDS: {

			return Object.assign({}, state, {
				all: false,
				images: true,
				videos: false,
				news: false
			});
		}

		case api.ActionTypes.SEARCH_VIDEOS_FEEDS: {

			return Object.assign({}, state, {
				all: false,
				images: false,
				videos: true,
				news: false
			});
		}

		case api.ActionTypes.SEARCH_NEWS_FEEDS: {

			return Object.assign({}, state, {
				all: false,
				images: false,
				videos: false,
				news: true
			});
		}

		default: {
			return state;
		}
	}
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

 export const getAllSearch = (state: State) => state.all;

 export const getImagesSearch = (state: State) => state.images;

 export const getVideosSearch = (state: State) => state.videos;

 export const getNewsSearch = (state: State) => state.news;