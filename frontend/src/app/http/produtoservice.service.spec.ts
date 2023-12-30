import { TestBed } from '@angular/core/testing';

import { ProdutoserviceService } from './produtoservice.service';

describe('ProdutoserviceService', () => {
  let service: ProdutoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
