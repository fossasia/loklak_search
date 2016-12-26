/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { SuggestService } from './suggest.service';
import { Jsonp, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const mockJsonpProvider = {
	deps: [MockBackend, BaseRequestOptions],
	useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		return new Jsonp(backend, defaultOptions);
	}
};

describe('Service: Suggest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      	MockBackend,
		BaseRequestOptions,
		{ provide: Jsonp, useValue: mockJsonpProvider},
      	SuggestService
      ]
    });
  });

  it('should create an instance of Suggest Service', inject([SuggestService], (service: SuggestService) => {
    expect(service).toBeTruthy();
  }));
});
