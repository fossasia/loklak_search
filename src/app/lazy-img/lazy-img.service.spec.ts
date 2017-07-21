import { TestBed, inject } from '@angular/core/testing';

import { LazyImgService } from './lazy-img.service';

describe('LazyImgService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LazyImgService]
		});
	});

	it('should ...', inject([LazyImgService], (service: LazyImgService) => {
		expect(service).toBeTruthy();
	}));
});
