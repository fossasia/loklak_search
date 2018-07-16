import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

describe('UserService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientModule
			],
			providers: [
				UserService,
				HttpClient
			]
		});
	});

	it('should be created', inject([UserService], (service: UserService) => {
		expect(service).toBeTruthy();
	}));

	it('minified_results should be set to true', inject([UserService], (service: UserService) => {
		expect(service.minified_results).toBeTruthy();
	}));

	it('followers should be truthy', inject([UserService], (service: UserService) => {
		expect(service.followers).toBeTruthy();
	}));

	it('following should be truthy', inject([UserService], (service: UserService) => {
		expect(service.following).toBeTruthy();
	}));

	it('followers should be set to 4', inject([UserService], (service: UserService) => {
		expect(service.followers).toEqual('4');
	}));

	it('following should be set to 4', inject([UserService], (service: UserService) => {
		expect(service.following).toEqual('4');
	}));
});
