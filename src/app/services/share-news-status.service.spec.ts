import { TestBed, inject } from '@angular/core/testing';

import { ShareNewsStatusService } from './share-news-status.service';

describe('ShareNewsStatusService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [ShareNewsStatusService]
		});
	});

	it('should be created', inject([ShareNewsStatusService], (service: ShareNewsStatusService) => {
		expect(service).toBeTruthy();
	}));
});
