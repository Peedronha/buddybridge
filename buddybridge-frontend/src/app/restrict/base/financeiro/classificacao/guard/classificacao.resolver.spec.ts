import { TestBed } from '@angular/core/testing';
import { ClassificacaoResolver } from './classificacao.resolver';
import { ClassificacaoService } from '../service/classificacao.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassificacaoResolver', () => {
  let resolver: ClassificacaoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassificacaoService]
    });
    resolver = TestBed.inject(ClassificacaoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
