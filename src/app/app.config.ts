import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {jobsReducer} from './core/store/reducers/jobs.reducer';
import {JobsEffects} from './core/store/effects/jobs.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
        jobs: jobsReducer,
    }),
    provideEffects(JobsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode() ,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
]
};
