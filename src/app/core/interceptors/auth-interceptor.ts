import {catchError, throwError} from 'rxjs';
import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastService} from '../services/toast';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe(catchError(err => {
    toast.show('An error occurred', 'error');
    return throwError(() => err);
  }));
};
