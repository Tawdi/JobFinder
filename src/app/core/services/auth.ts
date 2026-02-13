import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, map, switchMap, tap} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {AuthData, LoginRequest, RegisterRequest} from '../models/auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$ = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any = null;
  private api = environment.apiUrl + "/users";

  private http = inject(HttpClient);

  /**
   * REGISTER
   * @param credentials
   */
  register(credentials: RegisterRequest) {
    return this.http.get<User[]>(`${this.api}?email=${credentials.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return this.http.post<User>(this.api, credentials);
      }),
      tap(user => {
        this.handleAuth(user);
      })
    );
  }

  /**
   * LOGIN
   * @param credentials
   */
  login(credentials: LoginRequest) {
    return this.http.get<User[]>(`${this.api}?email=${credentials.email}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('User not found');
        }
        const user = users[0] as any;
        if (user.password !== credentials.password) {
          throw new Error('Invalid password');
        }
        return user;
      }),
      tap(user => {
        this.handleAuth(user);
      }));
  }

  /**
   * LOGOUT
   */
  logout() {
    this.user$.next(null);
    localStorage.removeItem('authData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  /**
   * AUTO LOGIN
   */
  autoLogin() {
    const data = localStorage.getItem('authData');
    if (!data) return;
    const authData: AuthData = JSON.parse(data);
    if (Date.now() > authData.tokenExpiration) {
      this.logout();
      return;
    }
    this.user$.next(authData.user);
    const remainingTime = authData.tokenExpiration - Date.now();
    this.autoLogout(remainingTime);
  }

  /**
   * AUTO LOGOUT
   * @param expirationDuration
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  /**
   * HANDLE AUTH (LOGIN + REGISTER)
   * @param user
   * @private
   */
  private handleAuth(user: User) {
    const token = this.generateToken();
    const expiration = Date.now() + 3600 * 1000; // 1h
    const authData: AuthData = {token, tokenExpiration: expiration, user};
    localStorage.setItem('authData', JSON.stringify(authData));
    this.user$.next(user);
    this.autoLogout(3600 * 1000);
  }

  /**
   *  SIMPLE TOKEN GENERATOR
   * @private
   */
  private generateToken(): string {
    return 'jf_' + Math.random().toString(36).substring(2) + Date.now();
  }

  /**
   * Update User in localStorage
   * @param user
   */
  updateLocalUser(user: User) {
    const data = localStorage.getItem('authData');
    if (!data) return;

    const authData = JSON.parse(data);
    authData.user = user;

    localStorage.setItem('authData', JSON.stringify(authData));
    this.user$.next(user);
  }

}
