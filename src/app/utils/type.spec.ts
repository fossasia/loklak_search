import { actionTypeCheck } from './type';

describe('Function: actionTypeCheck', () => {
	const mockAction1 = actionTypeCheck('[Api] MockAction1');
	it('should return label when it is unique', () => {
			const mockAction2 = actionTypeCheck('[Api] MockAction2');
			expect(mockAction2).toEqual('[Api] MockAction2');
	});

	it('should throw error if label is not unique', () => {
		expect(function() {
			actionTypeCheck('[Api] MockAction1');
		}).toThrow(new Error('Action type "[Api] MockAction1 is not unique"'));
	});
});
