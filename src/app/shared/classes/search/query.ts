/**
 * @param queryString: Basic string which contains the typed strng. (Includes hashtags, mentions etc.)
 *
 * @param location: String which specifies the location in location based searches.
 *
 * @param timeRestriction: Object with two properties which specifies time range of searches.
 * 				@property since : <yyyy-mm-dd> or <yyyy-mm-dd_HH:mm>
 * 				@property until : <yyyy-mm-dd> or <yyyy-mm-dd_HH:mm>
 */
export class Query {
	constructor (
		public queryString: String = '',
		private location: String = '',
		private timeRestriction: any = { since: '', until: '' }
	) { }

	public constructQueryString() {
		if (this.location) {
			this.queryString = `${this.queryString} near:${this.location}`;
		}
		if (this.timeRestriction.since) {
			this.queryString = `${this.queryString} since:${this.timeRestriction.since}`;
		}
		if (this.timeRestriction.until) {
			this.queryString = `${this.queryString} until:${this.timeRestriction.until}`;
		}
	}
}
