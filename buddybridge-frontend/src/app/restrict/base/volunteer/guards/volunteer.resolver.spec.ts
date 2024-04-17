import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { volunteerResolver } from './volunteer.resolver';

describe('volunteerResolver', () => {
  let resolver: volunteerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(volunteerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

