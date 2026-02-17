import {ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {jobsReducer} from './core/store/reducers/jobs.reducer';
import {JobsEffects} from './core/store/effects/jobs.effect';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth-interceptor';
import {favoritesReducer} from './core/store/reducers/favorites.reducer';
import {FavoritesEffects} from './core/store/effects/favorites.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      jobs: jobsReducer,
      favorites: favoritesReducer,
    }),
    provideEffects([JobsEffects,FavoritesEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};
