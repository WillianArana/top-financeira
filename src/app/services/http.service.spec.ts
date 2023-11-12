/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpService } from './HttpService';

describe('Service: Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
    });
  });

  it('should ...', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
