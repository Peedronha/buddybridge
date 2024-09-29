import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovimentacaoResolver } from './movimento.resolver';
import { MovimentacaoService } from '../service/movimento.service';

describe('MovimentacaoResolver', () => {
  let resolver: MovimentacaoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovimentacaoService]
    });
    resolver = TestBed.inject(MovimentacaoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
