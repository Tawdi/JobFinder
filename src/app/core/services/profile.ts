import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { tap } from 'rxjs';
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
}
