import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},


  // Auth
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
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
  {path: 'jobs', redirectTo: 'search', pathMatch: 'full'},
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

  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites').then(m => m.Favorites)
  },

  {
    path: 'applications',
    loadComponent: () =>
      import('./features/applications/applications').then(m => m.Applications)
  },

  // Profile (protected)
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile').then(m => m.Profile)
  }
];
