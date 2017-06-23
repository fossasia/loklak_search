import { FilterList, TimeBound } from '.';
import { parseDateToApiAcceptedFormat } from '../utils';

export interface Query {
	displayString: string;
	queryString: string;
	filter: FilterList;
	location: string;
	timeBound: TimeBound;
	from: boolean;
	followers?: boolean;
}

/**
 * Followers RegExp
 *
 * ^ asserts position at start of the string.
 * followers: matches the characters followers: literally (case sensitive)
 * \s* matches any whitespace character (equal to [\r\n\t\f\v ])
 * Quantifier(*) — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
 *
 * ([a-zA-Z0-9_]+) - First capturing group
 * [a-zA-Z0-9_] - Match a single character present in the list below
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const followersRegExp: RegExp = /^followers:\s*([a-zA-Z0-9_]+)/;


/**
 * From RegExp
 *
 * ^ asserts position at start of the string.
 * from: matches the characters from: literally (case sensitive)
 * \s* matches any whitespace character (equal to [\r\n\t\f\v ])
 * Quantifier(*) — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
 *
 * ([a-zA-Z0-9_]+) - First capturing group
 * [a-zA-Z0-9_] - Match a single character present in the list below
 * Quantifier(+) - Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
 */
export const fromRegExp: RegExp = /^from:\s*([a-zA-Z0-9_]+)/;


/**
 * @function parseQueryToString: Takes the query object as an argument and returns the corresponding query string.
 *
 * @argument query: Query
 * @return string
 */
export function parseQueryToString(query: Query): string {
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
