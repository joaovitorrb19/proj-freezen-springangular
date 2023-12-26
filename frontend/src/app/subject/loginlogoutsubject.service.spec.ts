import { TestBed } from '@angular/core/testing';

import { LoginlogoutsubjectService } from './loginlogoutsubject.service';

describe('LoginlogoutsubjectService', () => {
  let service: LoginlogoutsubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginlogoutsubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
