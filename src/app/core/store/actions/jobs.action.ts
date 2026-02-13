import {createAction, props} from '@ngrx/store';
import {JobsFilters} from '../reducers/jobs.reducer';
import {Job} from '../../models/job.model';

// Jobs
export const loadJobs = createAction(
  '[Jobs] Load Jobs',
  props<{ filters?: Partial<JobsFilters> }>()
)

export const loadJobsSuccess = createAction(
  '[Jobs] Load Jobs Success',
  props<{ jobs: Job[]; totalPages: number; totalJobs: number }>()
)

export const loadJobsFailure = createAction(
  '[Jobs] Load Jobs Failure',
  props<{ error: string }>()
);


// Single Job
export const loadJob = createAction(
  '[Jobs] Load Job',
  props<{ id: string }>()
);

export const loadJobSuccess = createAction(
  '[Jobs] Load Job Success',
  props<{ job: Job }>()
);

export const loadJobFailure = createAction(
  '[Jobs] Load Job Failure',
  props<{ error: string }>()
);

// Select Job
export const selectJob = createAction(
  '[Jobs] Select Job',
  props<{ job: Job }>()
);


// Filters
export const setFilters = createAction(
  '[Jobs] Set Filters',
  props<{ filters: Partial<JobsFilters> }>()
);

export const clearFilters = createAction('[Jobs] Clear Filters');


// Pagination
export const setPage = createAction(
  '[Jobs] Set Page',
  props<{ page: number }>()
);

export const nextPage = createAction('[Jobs] Next Page');
export const previousPage = createAction('[Jobs] Previous Page');

// Sort
export const setSortOrder = createAction(
  '[Jobs] Set Sort Order',
  props<{ descending: boolean }>()
);

// Search by specific criteria
export const searchByCategory = createAction(
  '[Jobs] Search By Category',
  props<{ category: string }>()
);

export const searchByLevel = createAction(
  '[Jobs] Search By Level',
  props<{ level: string }>()
);

export  const searchByLocation = createAction(
  '[Jobs] Search By Location',
  props<{ location: string }>()
);

