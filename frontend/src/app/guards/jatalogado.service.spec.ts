import { TestBed } from '@angular/core/testing';

import { JatalogadoService } from './jatalogado.service';

describe('JatalogadoService', () => {
  let service: JatalogadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JatalogadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
