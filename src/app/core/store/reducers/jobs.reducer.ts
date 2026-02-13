import {Job} from '../../models/job.model';
import {createReducer, on} from '@ngrx/store';

import {JobsActions} from '../actions'


export interface JobsFilters {
  category: string;
  level: string;
  location: string;
  descending: boolean;
  page: number;
  source?: string;
}

export interface JobsState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  totalJobs: number;
  filters: JobsFilters;
}


export const initialJobsFilters: JobsFilters = {
  category: '',
  level: '',
  location: '',
  descending: true,
  page: 1,
  source: 'themuse'
};

export const initialJobsState: JobsState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  totalPages: 0,
  totalJobs: 0,
  filters: initialJobsFilters
};


export const jobsReducer = createReducer(
  initialJobsState,

  // Jobs
  on(JobsActions.loadJobs,
    (state, {filters}) => ({
      ...state,
      loading: true,
      error: null,
      filters: {
        ...state.filters,
        ...filters
      }
    })
  ),
  on(JobsActions.loadJobsSuccess,
    (state, {jobs, totalJobs, totalPages}) => ({
      ...state,
      jobs,
      selectedJob: jobs.length > 0 ? jobs[0] : null,
      totalPages,
      totalJobs,
      loading: false,
      error: null
    }),
  ),
  on(JobsActions.loadJobsFailure,
    (state, {error}) => ({
      ...state,
      error
    })
  ),
  // Load Single Job
  on(JobsActions.loadJob, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(JobsActions.loadJobSuccess, (state, { job }) => ({
    ...state,
    selectedJob: job,
    loading: false,
    error: null
  })),

  on(JobsActions.loadJobFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Select Job
  on(JobsActions.selectJob, (state, { job }) => ({
    ...state,
    selectedJob: job
  })),

  // Update Filters
  on(JobsActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...filters,
      page: filters.page || 1
    }
  })),

  on(JobsActions.clearFilters, (state) => ({
    ...state,
    filters: initialJobsFilters
  })),

  // Pagination
  on(JobsActions.setPage, (state, { page }) => ({
    ...state,
    filters: {
      ...state.filters,
      page
    }
  })),

  on(JobsActions.nextPage, (state) => ({
    ...state,
    filters: {
      ...state.filters,
      page: state.filters.page + 1
    }
  })),

  on(JobsActions.previousPage, (state) => ({
    ...state,
    filters: {
      ...state.filters,
      page: Math.max(1, state.filters.page - 1)
    }
  }))
)
