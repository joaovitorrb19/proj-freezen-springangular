import { TestBed } from '@angular/core/testing';

import { CategoriaserviceService } from './categoriaservice.service';

describe('CategoriaserviceService', () => {
  let service: CategoriaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
