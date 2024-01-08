import { TestBed } from '@angular/core/testing';

import { VerificarauthserviceService } from './verificarauthservice.service';

describe('VerificarauthserviceService', () => {
  let service: VerificarauthserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificarauthserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
