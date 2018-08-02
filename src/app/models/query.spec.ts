import { Query, parseQueryToQueryString, parseQueryToRouterString, parseStringToQuery } from './query';

function getBaseQuery(): Query {
	return {
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
		from: false
	};
}

describe('function: parseQueryToQueryString', () => {
	it('should return string (foo) when no other attributes are set and displayString is foo', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';

		const expectedResult = 'foo';

		const result: string = parseQueryToQueryString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return the string (foo) even of the filter attributes are set and display string is foo', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.filter.image = true;

		const expectedResult = 'foo';

		const result: string = parseQueryToQueryString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return string (foo near:bar) when location attribute is set to bar', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.location = 'bar';

		const expectedResult = 'foo near:bar';

		const result: string = parseQueryToQueryString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return string (foo until:<API_DATE>) when until attribute is set to DATE', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		const date = new Date('2017-06-22:04:25');
		query.timeBound.until = date;
		const expectedResult = 'foo until:2017-06-22_04:25';

		const result: string = parseQueryToQueryString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return string (foo since:<API_DATE>) when since attribute is set to DATE', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		const date = new Date('2017-06-22:04:25');
		query.timeBound.since = date;

		const expectedResult = 'foo since:2017-06-22_04:25';

		const result: string = parseQueryToQueryString(query);

		expect(result).toEqual(expectedResult);
	});


	it(`should return string (foo since:<API_DATE1> until:<API_DATE2>)
			when since attribute is set to DATE1 and to DATE2`, () => {
			const query = getBaseQuery();
			query.displayString = 'foo';
			const date1 = new Date('2017-06-22:04:25');
			const date2 = new Date('2017-05-27:06:25');
			query.timeBound.since = date1;
			query.timeBound.until = date2;

			const expectedResult = 'foo since:2017-06-22_04:25 until:2017-05-27_06:25';

			const result: string = parseQueryToQueryString(query);

			expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo near:bar since:<API_DATE>)
			when location attribute is set to bar and since to DATE`, () => {
			const query = getBaseQuery();
			query.displayString = 'foo';
			query.location = 'bar';
			const date = new Date('2017-06-22:04:25');
			query.timeBound.until = date;

			const expectedResult = 'foo near:bar until:2017-06-22_04:25';

			const result: string = parseQueryToQueryString(query);

			expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo near:bar until:<API_DATE>)
			when location attribute is set to bar and until to DATE`, () => {
			const query = getBaseQuery();
			query.displayString = 'foo';
			query.location = 'bar';
			const date = new Date('2017-06-22:04:25');
			query.timeBound.until = date;

			const expectedResult = 'foo near:bar until:2017-06-22_04:25';

			const result: string = parseQueryToQueryString(query);

			expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo near:bar since:<API_DATE1> until:<API_DATE2>)
			when location attribute is set to bar and since to DATE1 and until to DATE2`, () => {
			const query = getBaseQuery();
			query.displayString = 'foo';
			query.location = 'bar';
			const date1 = new Date('2017-06-22:04:25');
			const date2 = new Date('2017-05-27:06:25');
			query.timeBound.since = date1;
			query.timeBound.until = date2;

			const expectedResult = 'foo near:bar since:2017-06-22_04:25 until:2017-05-27_06:25';

			const result: string = parseQueryToQueryString(query);

			expect(result).toEqual(expectedResult);
	});
});

describe('function: parseQueryToRouterString', () => {
	it('should return string (foo) when no other attributes are set and displayString is foo', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';

		const expectedResult = 'foo';
		const result: string = parseQueryToRouterString(query);
		expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo filter:image) when
			filter image is set to true and other filters are false`, () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.filter.image = true;

		const expectedResult = 'foo filter:image';
		const result: string = parseQueryToRouterString(query);
		expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo filter:video) when
			filter video is set to true and other filters are false`, () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.filter.video = true;

		const expectedResult = 'foo filter:video';
		const result: string = parseQueryToRouterString(query);
		expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo filter:image,video) when
			both video and image filters are set to true`, () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.filter.image = true;
		query.filter.video = true;

		const expectedResult = 'foo filter:image,video';
		const result: string = parseQueryToRouterString(query);
		expect(result).toEqual(expectedResult);
	});

	it(`should return string (foo near:bar filter:image) when
			location attribute is set to bar and filter image is set true`, () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.location = 'bar';
		query.filter.image = true;

		const expectedResult = 'foo near:bar filter:image';
		const result: string = parseQueryToRouterString(query);
		expect(result).toEqual(expectedResult);
	});
});

describe('function: parseStringToQuery', () => {
	it('should return proper query object when simple string is given', () => {
		const query = 'foo';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it(`query is (foo near:bar)`, () => {
		const query = 'foo near:bar';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.location = 'bar';
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);
		expect(expectedResult.queryString).toEqual(query);
		expect(expectedResult.routerString).toEqual(query);
	});

	it(`query is (from:human near:bar)`, () => {
		const query = 'from:human near:bar';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'near:bar';
		expectedResult.from = true;
		expectedResult.location = 'bar';
		expectedResult.queryString = 'near:bar near:bar';
		expectedResult.routerString = 'near:bar near:bar';

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it('query is (foo since:<API_DATE>), rejects since attribute because wrong date', () => {
		const query = 'foo since:2017-02-29_07:23';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it('query is (foo since:<API_DATE>), rejects since attribute because wrong date', () => {
		const query = 'foo since:2017-05-33_07:23';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it('query is (foo since:<API_DATE>), rejects since attribute because wrong time', () => {
		const query = 'foo since:2017-05-24_24:23';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it('query is (foo since:<API_DATE>), rejects since attribute because wrong time', () => {
		const query = 'foo since:2017-05-23_22:71';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it(`query is (foo near:ba4h7& since:<API_DATE>), rejects near attribute because
			near attributes can contain only alphabets` , () => {
		const query = 'foo near:ba4h7& since:2017-05-22_05:56';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.timeBound.since = new Date('2017-05-22:05:56');
		expectedResult.queryString = parseQueryToQueryString(expectedResult);
		expectedResult.routerString = parseQueryToRouterString(expectedResult);

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});

	it(`query is (foo from:human near:bar), rejects from attribute because
			from attribute can only come in the start of the query string`, () => {
		const query = 'foo from:human near:bar';

		const expectedResult = getBaseQuery();
		expectedResult.displayString = 'foo';
		expectedResult.location = null;
		expectedResult.queryString = 'foo';
		expectedResult.routerString = 'foo';

		const result: Query = parseStringToQuery(query);

		expect(result).toEqual(expectedResult);
	});
});
