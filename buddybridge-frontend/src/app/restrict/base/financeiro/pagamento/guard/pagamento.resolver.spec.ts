import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagamentoResolver } from './pagamento.resolver';
import { PagamentoService } from '../service/pagamento.service';

describe('PagamentoResolver', () => {
  let resolver: PagamentoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [PagamentoService] // Provide the PagamentoService
    });
    resolver = TestBed.inject(PagamentoResolver); // Inject the resolver
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy(); // Test if the resolver is correctly instantiated
  });

  // Additional tests can be added here to test the resolve method and other functionalities
});
