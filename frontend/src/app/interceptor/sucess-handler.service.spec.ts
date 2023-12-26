import { TestBed } from '@angular/core/testing';

import { SucessHandlerService } from './sucess-handler.service';

describe('SucessHandlerService', () => {
  let service: SucessHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucessHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
