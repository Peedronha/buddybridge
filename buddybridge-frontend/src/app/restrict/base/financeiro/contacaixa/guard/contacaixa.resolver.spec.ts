import { TestBed } from '@angular/core/testing';
import { ContaCaixaResolver } from './contacaixa.resolver';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContaCaixaService } from '../service/contacaixa.service';

describe('ContaCaixaResolver', () => {
  let resolver: ContaCaixaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContaCaixaService]
    });
    resolver = TestBed.inject(ContaCaixaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
