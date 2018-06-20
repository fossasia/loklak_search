import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PushService } from './push.service';

describe('PushService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule
			],
			providers: [
				PushService,
				HttpClient
			]
		});
	});

	it('should be created', inject([PushService], (service: PushService) => {
		expect(service).toBeTruthy();
	}));
});
