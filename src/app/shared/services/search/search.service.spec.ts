/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SearchService } from './search.service';

const mockJsonpProvider = {
	deps: [MockBackend, BaseRequestOptions],
	useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		return new Jsonp(backend, defaultOptions);
	}
};

describe('Service: Search', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MockBackend,
				BaseRequestOptions,
				{ provide: Jsonp, useValue: mockJsonpProvider},
				SearchService
			]
		});
	});


	it('should create an instance of search service',
		inject([SearchService, MockBackend], (service: SearchService, backend: MockBackend) => {
			expect(service).toBeTruthy();
	}));

	// TODO : Add tests for search service.
});
