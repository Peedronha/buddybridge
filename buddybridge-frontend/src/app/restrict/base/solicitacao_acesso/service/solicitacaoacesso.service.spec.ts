import { TestBed } from '@angular/core/testing';

import { SolicitacaoacessoService } from './solicitacaoacesso.service';

describe('SolicitacaoacessoService', () => {
  let service: SolicitacaoacessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoacessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
