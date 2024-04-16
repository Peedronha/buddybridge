import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { accountResolver } from './account.resolver';

describe('accountResolver', () => {
  let resolver: accountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(accountResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
