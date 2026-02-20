import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import {catchError, switchMap, tap, throwError} from 'rxjs';
import {AuthService} from './auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private api = environment.apiUrl + '/users';

  /**
   * Update user profile
   */
  updateProfile(userId: number, data: Partial<User>) {
    return this.http.patch<User>(`${this.api}/${userId}`, data).pipe(
      tap(updatedUser => {
        this.auth.updateLocalUser(updatedUser);
      })
    );
  }

  /**
   * Delete user account
   */
  deleteAccount(userId: number) {
    return this.http.delete(`${this.api}/${userId}`).pipe(
      tap(() => {
        this.auth.logout();
      })
    );
  }

  changePassword(userId: number, currentPassword: string, newPassword: string) {
    // Get the user to verify current password
    return this.http.get<any>(`${this.api}/${userId}`).pipe(
      switchMap(user => {
        // Verify current password matches
        if (user.password !== currentPassword) {
          return throwError(() => new Error('Current password is incorrect'));
        }

        // Validate new password
        if (newPassword.length < 6) {
          return throwError(() => new Error('New password must be at least 6 characters'));
        }

        // Update with new password
        return this.http.patch<User>(`${this.api}/${userId}`, {
          password: newPassword
        });
      }),
      tap(updatedUser => {
        this.auth.updateLocalUser(updatedUser);
      }),
      catchError(error => {
        console.error('Password change error:', error);
        return throwError(() => new Error(error.message || 'Failed to change password'));
      })
    );
  }
}
