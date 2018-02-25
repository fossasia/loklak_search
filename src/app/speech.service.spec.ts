import { TestBed, inject } from '@angular/core/testing';

import { SpeechService } from './speech.service';

describe('SpeechService', () => {
		beforeEach(() => {
				TestBed.configureTestingModule({
						providers: [SpeechService]
				});
		});

		it('should be created', inject([SpeechService], (service: SpeechService) => {
				expect(service).toBeTruthy();
		}));
});
