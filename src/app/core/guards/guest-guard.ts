import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth';
import {ToastService} from '../services/toast';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const toast = inject(ToastService)
  const router = inject(Router);

  const user = auth.user$.value;

  if (!user) return true;
  toast.show('You are already logged in', 'info');
  router.navigate(['/']);
  return false;
};
