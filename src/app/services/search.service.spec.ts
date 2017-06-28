/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SearchService, SearchServiceConfig } from '.';
import { MockApiResponseResult } from '../shared/mocks/feedItem.mock';

const mockJsonpProvider = {
	provide: Jsonp,
	deps: [MockBackend, BaseRequestOptions],
	useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		return new Jsonp(backend, defaultOptions);
	}
};

describe('Service: Search', () => {
	let service: SearchService = null;
	let backend: MockBackend = null;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MockBackend,
				BaseRequestOptions,
				mockJsonpProvider,
				SearchService
			]
		});
	});

	beforeEach(inject([SearchService, MockBackend], (searchService: SearchService, mockBackend: MockBackend) => {
		service = searchService;
		backend = mockBackend;
	}));

	const query = 'fossasia';
	const searchServiceConfig: SearchServiceConfig = new SearchServiceConfig();
	searchServiceConfig.addAggregationFields(['created_at', 'screen_name', 'mentions', 'hashtags']);

	const result = MockApiResponseResult;

	it('should create an instance of search service',
		inject([SearchService, MockBackend], () => {
			expect(service).toBeTruthy();
		}));

	it('should call the search api and return the search results', (done) => {
		backend.connections.subscribe((connection: MockConnection) => {
			const options = new ResponseOptions({
				body: JSON.stringify(result)
			});
			connection.mockRespond(new Response(options));
			expect(connection.request.method).toEqual(RequestMethod.Get);
			expect(connection.request.url).toEqual(
				`http://api.loklak.org/api/search.json` +
									`?q=${query}` +
									`&callback=JSONP_CALLBACK` +
									`&minified=true&source=all` +
									`&maximumRecords=20&timezoneOffset=${searchServiceConfig.getTimezoneOffset()}` +
									`&startRecord=${searchServiceConfig.startRecord}` +
									`&fields=created_at,screen_name,mentions,hashtags&limit=10`);
		});

		service
			.fetchQuery(query, searchServiceConfig)
			.subscribe((res) => {
				expect(res).toEqual(result);
				done();
			});
	});

});

