import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const combinedAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.getUserObj()!=null && (authService.getRole()=="Admin" || authService.getRole()=="Owner")) {
    return true;
  } else {
    authService.signOut()
    router.navigate(['/login']);
    return false;
  }
};
