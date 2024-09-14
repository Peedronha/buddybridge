import { TestBed } from '@angular/core/testing';

import { GrupoacessoserviceService } from './grupoacessoservice.service';

describe('GrupoacessoserviceService', () => {
  let service: GrupoacessoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoacessoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
