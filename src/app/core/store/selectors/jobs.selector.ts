import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JobsState } from '../reducers/jobs.reducer';

export const selectJobsState = createFeatureSelector<JobsState>('jobs');

// Basic selectors
export const selectAllJobs = createSelector(
  selectJobsState,
  (state) => state.jobs
);

export const selectSelectedJob = createSelector(
  selectJobsState,
  (state) => state.selectedJob
);

export const selectJobsLoading = createSelector(
  selectJobsState,
  (state) => state.loading
);

export const selectJobsError = createSelector(
  selectJobsState,
  (state) => state.error
);

export const selectTotalPages = createSelector(
  selectJobsState,
  (state) => state.totalPages
);

export const selectTotalJobs = createSelector(
  selectJobsState,
  (state) => state.totalJobs
);

// Filters selectors
export const selectJobsFilters = createSelector(
  selectJobsState,
  (state) => state.filters
);

export const selectCurrentPage = createSelector(
  selectJobsFilters,
  (filters) => filters.page
);

export const selectSearchCategory = createSelector(
  selectJobsFilters,
  (filters) => filters.category
);

export const selectSearchLevel = createSelector(
  selectJobsFilters,
  (filters) => filters.level
);

export const selectSearchLocation = createSelector(
  selectJobsFilters,
  (filters) => filters.location
);

export const selectSortOrder = createSelector(
  selectJobsFilters,
  (filters) => filters.descending
);

// Derived selectors
export const selectHasNextPage = createSelector(
  selectCurrentPage,
  selectTotalPages,
  (currentPage, totalPages) => currentPage < totalPages
);

export const selectHasPreviousPage = createSelector(
  selectCurrentPage,
  (currentPage) => currentPage > 1
);

export const selectNoJobsFound = createSelector(
  selectAllJobs,
  selectJobsLoading,
  (jobs, loading) => !loading && jobs.length === 0
);
