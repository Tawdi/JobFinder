import {ActionReducerMap} from '@ngrx/store';
import {initialJobsState, jobsReducer, JobsState} from './jobs.reducer';
import {favoritesReducer, FavoritesState, initialFavoritesState} from './favorites.reducer';

export interface AppState {
  jobs: JobsState;
  // applications: ApplicationsState;
  favorites: FavoritesState;
}

export const initialAppState: AppState = {
  jobs: initialJobsState,
  // applications: initialApplicationsState,
  favorites: initialFavoritesState
};

export const reducers: ActionReducerMap<AppState> = {
  jobs: jobsReducer,
  // applications: applicationsReducer,
  favorites: favoritesReducer
};
