import { TestBed } from '@angular/core/testing';

import { ContacaixaService } from './contacaixa.service';

describe('ContacaixaService', () => {
  let service: ContacaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContacaixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
