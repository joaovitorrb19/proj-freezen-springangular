import { TestBed } from '@angular/core/testing';

import { LoginCadastroService } from './login-cadastro.service';

describe('LoginService', () => {
  let service: LoginCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
