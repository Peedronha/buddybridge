import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { grupoacessoResolver } from './grupoacesso.resolver';

describe('grupoacessoResolver', () => {
  let resolver: grupoacessoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(grupoacessoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
