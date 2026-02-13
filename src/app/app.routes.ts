import {Routes} from '@angular/router';
import {guestGuard} from './core/guards/guest-guard';
import {authGuard} from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Auth (guest only)
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register/register').then(m => m.Register)
  },

  // Home
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home)
  },

  // Jobs
  { path: 'jobs', redirectTo: 'search', pathMatch: 'full' },

  {
    path: 'search',
    loadComponent: () =>
      import('./features/jobs/search/search').then(m => m.Search)
  },

  {
    path: 'jobs/:id',
    loadComponent: () =>
      import('./features/jobs/job-details/job-details').then(m => m.JobDetails)
  },

  // Favorites (protected)
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/favorites/favorites').then(m => m.Favorites)
  },

  // Applications (protected)
  {
    path: 'applications',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/applications/applications').then(m => m.Applications)
  },

  // Profile (protected)
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile').then(m => m.Profile)
  }
];
