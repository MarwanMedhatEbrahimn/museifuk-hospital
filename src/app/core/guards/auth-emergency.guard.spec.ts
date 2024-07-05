import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authEmergencyGuard } from './auth-emergency.guard';

describe('authEmergencyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authEmergencyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
