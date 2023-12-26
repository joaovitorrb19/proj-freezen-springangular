import { TestBed } from '@angular/core/testing';

import { RecursosComAuthorizationService } from './recursos-com-authorization.service';

describe('RecursosComAuthorizationService', () => {
  let service: RecursosComAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosComAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
