import { getIndicesOf, cut } from './array';

describe('Function: getIndicesOf', () => {
	const s1 = 'Lorem ipsum dolor Fossasia sit amet, consectetur adipiscing elit.' +
	'Donec laoreet Fossasia tincidunt nisl fossasia in ullamcorper. In vitae rhoncus lacus. Donec at.';
	it('should return empty array if string to be fetched is not given', () => {
		expect(getIndicesOf(s1, '')).toEqual([]);
	});

	it('should return array of indices if all parameters are supplied and case sensitive is true', () => {
		const s2 = 'Fossasia';
		expect(getIndicesOf(s1, s2, true)).toEqual([18, 79]);
	});

	it('should return array of indices if all parameters are supplied and case sensitive is false', () => {
		const s2 = 'fossasia';
		expect(getIndicesOf(s1, s2, false)).toEqual([18, 79, 103]);
	});
});

describe('function: cut', () => {
	const main = 'the loklak search is a frontend to the loklak server backend';

	it('should cut the main string with the scissor string', () => {
		const scissor = 'frontend';
		const expectedResult = 'the loklak search is ato the loklak server backend';
		const result = cut(main, scissor);
		expect(result).toEqual(expectedResult);
	});

	it('should cut the main string with the scissor string with correct delimiter', () => {
		const scissor = 'frontend';
		const expectedResult = 'the loklak search is a/to the loklak server backend';
		const result = cut(main, scissor, '/');
		expect(result).toEqual(expectedResult);
	});

	it('should remove all the occurances of scissor string from the main string', () => {
		const scissor = 'loklak';
		const expectedResult = 'the search is a frontend to the server backend';
		const result = cut(main, scissor, ' ');
		expect(result).toEqual(expectedResult);
	});

	it('should eliminate the whitespace chunks from the string also trimming the result', () => {
		const main2 = '     the loklak search is a frontend frontend to the loklak server backend    ';
		const scissor = 'frontend';
		const expectedResult = 'the loklak search is a~to the loklak server backend';
		const result = cut(main2, scissor, '~');
		expect(result).toEqual(expectedResult);
	});
});
