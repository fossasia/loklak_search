import { containAlphabetsOnly, containNameCharactersOnly, isValidApiAcceptedDateString } from './string-validators';
import { async } from '@angular/core/testing';

describe('function: containAlphabetsOnly', () => {
	it('should return true when input is (fossasia)', () => {
		const str = 'fossasia';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeTruthy();
	});

	it('should return false when input is (foss_)', () => {
		const str = 'foss_';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (fo$$asia)', () => {
		const str = 'fo$$asia';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (fo56asia)', () => {
		const str = 'fo56asia';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (313123)', () => {
		const str = '313123';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (~!@#$%^&*)', () => {
		const str = '~!@#$%^&*';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (9934%^&*)', () => {
		const str = '9934%^&*';

		const result: boolean = containAlphabetsOnly(str);
		expect(result).toBeFalsy();
	});
});


describe('function: containNameCharactersOnly', () => {
	it('should return true when input is (fossasia)', () => {
		const str = 'fossasia';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeTruthy();
	});

	it('should return true when input is (foss_)', () => {
		const str = 'foss_';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeTruthy();
	});

	it('should return false when input is (fo$$asia)', () => {
		const str = 'fo$$asia';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (fo56asia)', () => {
		const str = 'fo56asia';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeTruthy();
	});

	it('should return false when input is (313123)', () => {
		const str = '313123';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeTruthy();
	});

	it('should return false when input is (~!@#$%^&*)', () => {
		const str = '~!@#$%^&*';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (9934%^&*)', () => {
		const str = '9934%^&*';

		const result: boolean = containNameCharactersOnly(str);
		expect(result).toBeFalsy();
	});
});


describe('function: isValidApiAcceptedDateString', () => {
	it('should return true when input is (2017-04-23_06:45)', () => {
		const str = '2017-04-23_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeTruthy();
	});

	it('should return true when input is empty string', () => {
		const str = '';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23_6:45)' +
			'as the hours should conttain 2 digits', () => {
		const str = '2017-04-23_6:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23_06:4)' +
			'as the minutes should conttain 2 digits', () => {
		const str = '2017-04-23_06:4';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-1_06:45)' +
			'as the date should conttain 2 digits', () => {
		const str = '2017-04-1_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-4-23_06:45)' +
			'as the month should conttain 2 digits', () => {
		const str = '2017-4-23_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (17-04-23_06:45)' +
			'as the year should conttain 4 digits', () => {
		const str = '17-04-23_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23:06:45)' +
			'as time and date should be separated by underscore', () => {
		const str = '2017-04-23:06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017/04/23_06:45)' +
			'as year, month and date should be separated by dash', () => {
		const str = '2017/04/23_06:4';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23_24:45)' +
			'as hours can\'t exceed or be equal to 24', () => {
		const str = '2017-04-23_24:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23_-01:45)' +
			'as hours cant\'t be negative', () => {
		const str = '2017-04-23_-01:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23_06:104)' +
			'as minutes can\'t exceed 60', () => {
		const str = '2017-04-23_06:104';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-23_06:-33)' +
			'as minutes cant\'t be negative', () => {
		const str = '2017-04-23_06:-33';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-04-32_06:45)' +
			'as date can\'t be more than 31 for any month', () => {
		const str = '2017-04-32_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-<30-day-month>-31_06:45)' +
			'as date can\'t be 31 for any <30-day-month>', async(() => {
		let str = '2017-<30-day-month>-31_06:45';

		const months30Day = [2, 4, 6, 9, 11];

		months30Day.forEach(month => {
			const monthStr = (month < 10) ? `0${month}` : `${month}`;
			str = `2017-${monthStr}-31_06:45`;
			const result = isValidApiAcceptedDateString(str);
			expect(result).toBeFalsy();
		});
	}));

	it('should return true when input is (2017-<31-day-month>-31_06:45)' +
			'as date can be 31 for any <31-day-month>', () => {
		let str = '2017-<31-day-month>-31_06:45';

		const months31Day = [1, 3, 5, 7, 8, 10, 12];

		months31Day.forEach(month => {
			const monthStr = (month < 10) ? `0${month}` : `${month}`;
			str = `2017-${monthStr}-31_06:45`;
			const result = isValidApiAcceptedDateString(str);
			expect(result).toBeTruthy();
		});
	});

	it('should return false when input is (<Any-Year>-02-30_06:45)' +
			'as date can\'t be 30 in february', () => {
		const str = '2017-02-30_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (<Non-Leap-Year>-02-29_06:45)' +
			'as date can\'t be 29 in february in a <Non-Leap-Year>', () => {
		let str = '<Non-Leap-Year>-02-29_06:45';

		// Runnning for more than 400 years to ensure all the cases are covered.
		for (let year = 1990; year <= 2410; year++) {
			if (!(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
				str = `${year}-02-29_06:45`;

				const result = isValidApiAcceptedDateString(str);
				expect(result).toBeFalsy();
			}
		}
	});

	it('should return true when input is (<Leap-Year>-02-29_06:45)' +
			'as date can be 29 in february in a <Leap-Year>', () => {
		let str = '<Leap-Year>-02-29_06:45';

		// Runnning for more than 400 years to ensure all the cases are covered.
		for (let year = 1990; year <= 2410; year++) {
			if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
				str = `${year}-02-29_06:45`;

				const result = isValidApiAcceptedDateString(str);
				expect(result).toBeTruthy();
			}
		}
	});

	it('should return false when input is (2017-04-32_06:45)' +
			'as date can\'t be more than 31 for any month', () => {
		const str = '2017-04-32_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});

	it('should return false when input is (2017-14-23_06:45)' +
			'as month can\'t be  more than 12', () => {
		const str = '2017-14-23_06:45';

		const result = isValidApiAcceptedDateString(str);
		expect(result).toBeFalsy();
	});
});
