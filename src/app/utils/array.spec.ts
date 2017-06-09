import { getIndicesOf } from './array';

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
