/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuggestService } from './suggest.service';

describe('Service: Suggest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestService]
    });
  });

  it('should ...', inject([SuggestService], (service: SuggestService) => {
    expect(service).toBeTruthy();
  }));
});
