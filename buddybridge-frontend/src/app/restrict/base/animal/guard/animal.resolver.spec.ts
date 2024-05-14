import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { animalResolver } from './animal.resolver';

describe('animalResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => animalResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
