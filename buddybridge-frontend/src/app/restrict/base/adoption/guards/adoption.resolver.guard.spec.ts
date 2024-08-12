import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adoptionResolverGuard } from './adoption.resolver.guard';

describe('adoptionResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adoptionResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
