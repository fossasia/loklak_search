import { Query, parseQueryToString } from './query';

function getBaseQuery(): Query {
	return {
		displayString: '',
		queryString: '',
		filter: {
			video: null,
			audio: null,
			image: null
		},
		location: null,
		timeBound: {
			since: null,
			until: null
		},
		from: false
	};
}

describe('function: parseQueryToString', () => {
	it('should return string (foo) when no other attributes are set and displayString is foo', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';

		const expectedResult = 'foo';

		const result: string = parseQueryToString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return string (foo near:bar) when location attribute is set to bar', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		query.location = 'bar';

		const expectedResult = 'foo near:bar';

		const result: string = parseQueryToString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return string (foo until:<API_DATE>) when until attribute is set to DATE', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		const date = new Date('2017-06-22:04:25');
		query.timeBound.until = date;
		console.log(query);
		const expectedResult = 'foo until:2017-06-22_04:25';

		const result: string = parseQueryToString(query);

		expect(result).toEqual(expectedResult);
	});

	it('should return string (foo since:<API_DATE>) when since attribute is set to DATE', () => {
		const query = getBaseQuery();
		query.displayString = 'foo';
		const date = new Date('2017-06-22:04:25');
		query.timeBound.since = date;
		console.log(query);

		const expectedResult = 'foo since:2017-06-22_04:25';

		const result: string = parseQueryToString(query);

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

			const result: string = parseQueryToString(query);

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

			const result: string = parseQueryToString(query);

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

			const result: string = parseQueryToString(query);

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

			const result: string = parseQueryToString(query);

			expect(result).toEqual(expectedResult);
	});
});
