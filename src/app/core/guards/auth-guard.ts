import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth';
import {ToastService} from '../services/toast';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const toast = inject(ToastService)
  const router = inject(Router);

  const user = auth.user$.value;

  if (user) return true;
  toast.show('You must be logged in to access this page', 'error');
  router.navigate(['/login']);

  return false;
};
