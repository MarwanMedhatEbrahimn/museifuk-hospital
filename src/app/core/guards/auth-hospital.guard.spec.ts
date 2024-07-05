import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authHospitalGuard } from './auth-hospital.guard';

describe('authHospitalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authHospitalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
