import { FilterList, TimeBound } from '.';
import { parseDateToApiAcceptedFormat, cut } from '../utils';
import * as regExp from '../utils/reg-exp';
import * as validators from '../utils/string-validators';

export interface Query {
	displayString: string;
	queryString: string;
	routerString: string;
	filter: FilterList;
	location: string;
	timeBound: TimeBound;
	from: boolean;
}

/**
 * @function parseQueryToQueryString
 * Takes the query object as an argument and returns the corresponding query string.
 * This query string is the actual string which can be used to query from the API.
 * As the API does not accept the filter in the query string thus we don't add filters
 * to the query string.
 *
 * @arg query: Query
 * @return string
 */
export function parseQueryToQueryString(query: Query): string {
	let qs: string;

	qs = query.displayString;

	if (query.location) {
		qs += ` near:${query.location}`;
	}

	if (query.timeBound.since) {
		qs += ` since:${parseDateToApiAcceptedFormat(query.timeBound.since)}`;
	}

	if (query.timeBound.until) {
		qs += ` until:${parseDateToApiAcceptedFormat(query.timeBound.until)}`;
	}

	return qs;
}

/**
 * @function parseQueryToRouterString
 * Takes the query object as an argument and returns the corresponding router string.
 * This router string is the string which can be used in the URL, as it contains all
 * the information about the current query.
 *
 * @argument query: Query
 * @return string
 */
export function parseQueryToRouterString(query: Query): string {
	let qs: string;

	qs = parseQueryToQueryString(query);

	const activeFilterArray: string[] = new Array<string>();

	Object.keys(query.filter).sort().forEach(filter => {
		if (query.filter[filter]) {
			activeFilterArray.push(filter);
		}
	});

	qs += (activeFilterArray.length) ? ` filter:${activeFilterArray.join(',')}` : '';

	return qs;
}

/**
 * @function parseStringToQuery
 * Takes the queryString and chunks it to the query object
 *
 * @arg str: string
 * @return Query
 */
export function parseStringToQuery(str: string): Query {
	const queryObject: Query = {
		displayString: '',
		queryString: '',
		routerString: '',
		filter: {
			video: false,
			image: false
		},
		location: null,
		timeBound: {
			since: null,
			until: null
		},
		from: false,
	};

	const fromMatch: RegExpExecArray = regExp.fromRegExp.exec(str);
	const nearMatch: RegExpExecArray = regExp.nearRegExp.exec(str);
	const sinceMatch: RegExpExecArray = regExp.sinceRegExp.exec(str);
	const untilMatch: RegExpMatchArray = regExp.untilRegExp.exec(str);
	const filterMatch: RegExpExecArray = regExp.filterRegExp.exec(str);

	str = (fromMatch) ? cut(str, fromMatch[0], ' ') : str;
	str = (nearMatch) ? cut(str, nearMatch[0], ' ') : str;
	str = (sinceMatch) ? cut(str, sinceMatch[0], ' ') : str;
	str = (untilMatch) ? cut(str, untilMatch[0], ' ') : str;
	str = (filterMatch) ? cut(str, filterMatch[0], ' ') : str;

	queryObject.displayString = str;

	if (fromMatch && fromMatch[1] !== ':') {
		if (validators.containNameCharactersOnly(fromMatch[1]) && fromMatch.index === 0) {
			queryObject.from = true;
			queryObject.displayString = fromMatch[0];
		} else {
			// Handle Invalid later
		}
	}

	if (nearMatch && nearMatch[1] !== ':') {
		if (validators.containAlphabetsOnly(nearMatch[1])) {
			queryObject.location = nearMatch[1];
		} else {
			// Handle Invalid later
		}
	}

	if (sinceMatch && sinceMatch[1] !== ':') {
		if (validators.isValidApiAcceptedDateString(sinceMatch[1])) {
			const validDateTimeString = sinceMatch[1].split('_').join(':');
			queryObject.timeBound.since = new Date(validDateTimeString);
		} else {
			// Handle Invalid later
		}
	}

	if (untilMatch && untilMatch[1] !== ':') {
		if (validators.isValidApiAcceptedDateString(untilMatch[1])) {
			const validDateTimeString = untilMatch[1].split('_').join(':');
			queryObject.timeBound.until = new Date(validDateTimeString);
		} else {
			// Handle Invalid later
		}
	}

	if (filterMatch && filterMatch[1] !== ':') {
		const filtersArray = filterMatch[1].split(',');
		filtersArray.forEach(filter => {
			if (filter === 'image') {
				queryObject.filter.image = true;
			} else if (filter === 'video') {
				queryObject.filter.video = true;
			} else {
				// Handle Invalid later
			}
		});
	}

	queryObject.queryString = parseQueryToQueryString(queryObject);
	queryObject.routerString = parseQueryToRouterString(queryObject);
	return queryObject;
}
