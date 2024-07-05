import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { combinedAuthGuard } from './combined-auth.guard';

describe('combinedAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => combinedAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
