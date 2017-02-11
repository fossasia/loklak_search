/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AggregationService } from './aggregation.service';

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
				AggregationService
			]
		});
	});


	it('should create an instance of search service',
		inject([AggregationService, MockBackend], (service: AggregationService, backend: MockBackend) => {
			expect(service).toBeTruthy();
	}));

	// TODO : Add tests for aggregation service.
});
