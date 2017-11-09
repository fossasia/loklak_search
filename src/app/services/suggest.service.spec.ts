/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { SuggestService } from './suggest.service';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MockApiResponseResult } from '../shared/mocks/feedItem.mock';

const mockJsonpProvider = {
	provide: Jsonp,
	deps: [MockBackend, BaseRequestOptions],
	useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		return new Jsonp(backend, defaultOptions);
	}
};

describe('Service: Suggest', () => {
	let service: SuggestService = null;
	let backend: MockBackend = null;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MockBackend,
				BaseRequestOptions,
				mockJsonpProvider,
				SuggestService
			]
		});
	});

	beforeEach(inject([SuggestService, MockBackend], (suggestService: SuggestService, mockBackend: MockBackend) => {
		service = suggestService;
		backend = mockBackend;
	}));

	const query = 'fossasia';
	const result = MockApiResponseResult;

	it('should create an instance of Suggest Service', inject([SuggestService], () => {
		expect(service).toBeTruthy();
	}));

	it('should call the Suggest api and return the search results', (done) => {
		backend.connections.subscribe((connection: MockConnection) => {
			const options = new ResponseOptions({
				body: JSON.stringify(result)
			});
			connection.mockRespond(new Response(options));
			expect(connection.request.method).toEqual(RequestMethod.Get);
			expect(connection.request.url).toEqual(
				`https://api.loklak.org/api/suggest.json` +
									`?q=${query}` +
									`&callback=JSONP_CALLBACK` +
									`&minified=true` +
									`&order=desc` +
									`&orderby=query_count`);
		});

		service
			.fetchQuery(query)
			.subscribe((res) => {
				expect(res).toEqual(result);
				done();
			});
	});

});
