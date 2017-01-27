/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';

const mockJsonpProvider = {
	deps: [MockBackend, BaseRequestOptions],
	useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		return new Jsonp(backend, defaultOptions);
	}
};

describe('Service: UserSearch', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MockBackend,
				BaseRequestOptions,
				{ provide: Jsonp, useValue: mockJsonpProvider},
				UserService
			]
		});
	});


	it('should create an instance of search service',
		inject([UserService, MockBackend], (service: UserService, backend: MockBackend) => {
			expect(service).toBeTruthy();
	}));

	// TODO : Add tests for user service.
});
