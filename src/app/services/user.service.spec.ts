/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';
import { MockApiResponseResult } from '../shared/mocks/feedItem.mock';

const mockJsonpProvider = {
	provide: Jsonp,
	deps: [MockBackend, BaseRequestOptions],
	useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		return new Jsonp(backend, defaultOptions);
	}
};

describe('Service: UserSearch', () => {
	let service: UserService = null;
	let backend: MockBackend = null;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MockBackend,
				BaseRequestOptions,
				mockJsonpProvider,
				UserService
			]
		});
	});

	beforeEach(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
		service = userService;
		backend = mockBackend;
	}));

	const result = MockApiResponseResult;
	const user = 'Fossasia';
	const follow_count = 4;


	it('should create an instance of user search service',
		inject([UserService, MockBackend], () => {
			expect(service).toBeTruthy();
		}));

	it('should call the user search api and return the search results', (done) => {
		backend.connections.subscribe((connection: MockConnection) => {
			const options = new ResponseOptions({
				body: JSON.stringify(result)
			});
			connection.mockRespond(new Response(options));
			expect(connection.request.method).toEqual(RequestMethod.Get);
			expect(connection.request.url).toEqual(
				`https://api.loklak.org/api/user.json` +
									`?screen_name=${user}` +
									`&followers=${follow_count}` +
									`&following=${follow_count}` +
									`&callback=JSONP_CALLBACK` +
									`&minified=true`);
		});

		service
			.fetchQuery(user)
			.subscribe((res) => {
				expect(res).toEqual(result);
				done();
			});
	});

});
