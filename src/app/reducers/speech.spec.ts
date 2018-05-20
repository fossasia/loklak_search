import * as fromSpeech from './speech';

describe('SpeechReducer', () => {
	describe('undefined action', () => {
		it('should return the default state', () => {
			const action = {} as any;
			const result = fromSpeech.reducer(undefined, action);
			expect(result).toEqual(fromSpeech.initialState);
		});
	});
});
