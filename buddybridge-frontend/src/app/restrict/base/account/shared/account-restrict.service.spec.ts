import { TestBed } from '@angular/core/testing';

import { AccountRestrictService } from './account-restrict.service';

describe('AccountRestrictService', () => {
  let service: AccountRestrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountRestrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
