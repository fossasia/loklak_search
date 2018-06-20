import {
	followersRegExp,
	fromRegExp,
	nearRegExp,
	sinceRegExp,
	untilRegExp,
	filterRegExp
} from './reg-exp';

describe('reg-exp', () => {
	// Test expression of the form fromRegExp
	it('should return true when input is (from:fossasia)', () => {
		const str = 'from:fossasia';
		const match: RegExpExecArray = fromRegExp.exec(str);
		expect(match[0]).toEqual('from:fossasia');
		expect(match[1]).toEqual('fossasia');
		expect(match).toBeTruthy();
	});

	// Test expression of the form fromRegExp
	it('should return false when input is (fossasia)', () => {
		const str = 'fossasia';
		const match: RegExpExecArray = fromRegExp.exec(str);
		expect(match).toBeNull();
		expect(match).toBeFalsy();
	});

	// Test expression of the form followersRegExp
	it('should return true when input is (followers:fossasia)', () => {
		const str = 'followers:fossasia';
		const match: RegExpExecArray = followersRegExp.exec(str);
		expect(match[0]).toEqual('followers:fossasia');
		expect(match[1]).toEqual('fossasia');
		expect(match).toBeTruthy();
	});

	// Test expression of the form followersRegExp
	it('should return false when input is (near:fossasia)', () => {
		const str = 'near:fossasia';
		const match: RegExpExecArray = followersRegExp.exec(str);
		expect(match).toBeNull();
		expect(match).toBeFalsy();
	});

	// Test expression of the form nearRegExp
	it('should return true when input is (near:Delhi)', () => {
		const str = 'near:Delhi';
		const match: RegExpExecArray = nearRegExp.exec(str);
		expect(match[0]).toEqual('near:Delhi');
		expect(match[1]).toEqual('Delhi');
		expect(match).toBeTruthy();
	});

	// Test expression of the form nearRegExp
	it('should return false when input is (from:Delhi)', () => {
		const str = 'from:Delhi';
		const match: RegExpExecArray = nearRegExp.exec(str);
		expect(match).toBeNull();
		expect(match).toBeFalsy();
	});

	// Test expression of the form sinceRegExp
	it('should return true when input is (since:19:06:2018)', () => {
		const str = 'since:19:06:2018';
		const match: RegExpExecArray = sinceRegExp.exec(str);
		expect(match[0]).toEqual('since:19:06:2018');
		expect(match[1]).toEqual('19:06:2018');
		expect(match).toBeTruthy();
	});

	// Test expression of the form sinceRegExp
	it('should return false when input is (from:19:06:2018)', () => {
		const str = 'from:19:06:2018';
		const match: RegExpExecArray = sinceRegExp.exec(str);
		expect(match).toBeNull();
		expect(match).toBeFalsy();
	});

	// Test expression of the form untilRegExp
	it('should return true when input is (until:19:06:2018)', () => {
		const str = 'until:19:06:2018';
		const match: RegExpExecArray = untilRegExp.exec(str);
		expect(match[0]).toEqual('until:19:06:2018');
		expect(match[1]).toEqual('19:06:2018');
		expect(match).toBeTruthy();
	});

	// Test expression of the form untilRegExp
	it('should return false when input is (near:19:06:2018)', () => {
		const str = 'near:19:06:2018';
		const match: RegExpExecArray = untilRegExp.exec(str);
		expect(match).toBeNull();
		expect(match).toBeFalsy();
	});

	// Test expression of the form filterRegExp
	it('should return true when input is (filter:image)', () => {
		const str = 'filter:image';
		const match: RegExpExecArray = filterRegExp.exec(str);
		expect(match[0]).toEqual('filter:image');
		expect(match[1]).toEqual('image');
		expect(match).toBeTruthy();
	});

	// Test expression of the form filterRegExp
	it('should return true when input is (filter:video)', () => {
		const str = 'filter:video';
		const match: RegExpExecArray = filterRegExp.exec(str);
		expect(match[0]).toEqual('filter:video');
		expect(match[1]).toEqual('video');
		expect(match).toBeTruthy();
	});

	// Test expression of the form filterRegExp
	it('should return false when input is (image:filter)', () => {
		const str = 'image:filter';
		const match: RegExpExecArray = filterRegExp.exec(str);
		expect(match).toBeNull();
		expect(match).toBeFalsy();
	});
});
