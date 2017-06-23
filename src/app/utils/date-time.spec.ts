import { parseDateToApiAcceptedFormat } from './date-time';

describe('Function: parseDateToApiAcceptedFormat', () => {
	it(`should return the Api Accepted Format of Date<yyyy-MM-dd_HH:mm>
			when date type object is given as an argument`, () => {
			const testCases: Array<{ date: Date, expectedStr: string }> = [
				{
					date: new Date('2017-06-05:22:50'),
					expectedStr: '2017-06-05_22:50'
				},
				{
					date: new Date('2017-06-05:00:00'),
					expectedStr: '2017-06-05_00:00'
				}
			];

			testCases.forEach(test => {
				const result: string = parseDateToApiAcceptedFormat(test.date);
				expect(result).toEqual(test.expectedStr);
			});
	});
});
