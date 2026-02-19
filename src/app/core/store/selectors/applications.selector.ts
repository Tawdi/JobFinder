import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ApplicationsState } from '../reducers/applications.reducer';

export const selectApplicationsState = createFeatureSelector<ApplicationsState>('applications');

// Basic selectors
export const selectAllApplications = createSelector(
  selectApplicationsState,
  (state) => state.applications
);

export const selectSelectedApplication = createSelector(
  selectApplicationsState,
  (state) => state.selectedApplication
);

export const selectApplicationsLoading = createSelector(
  selectApplicationsState,
  (state) => state.loading
);

export const selectApplicationsError = createSelector(
  selectApplicationsState,
  (state) => state.error
);

export const selectApplicationsSuccess = createSelector(
  selectApplicationsState,
  (state) => state.success
);

// Per-item loading state
export const selectIsApplicationLoading = (id: number) => createSelector(
  selectApplicationsState,
  (state) => state.loadingApplicationIds.has(id.toString())
);

// Check if user has applied to a specific job
export const selectHasApplied = (offerId: string) => createSelector(
  selectAllApplications,
  (applications) => applications.some(app => app.offerId === offerId)
);

// Get application ID for a specific job
export const selectApplicationIdByOfferId = (offerId: string) => createSelector(
  selectAllApplications,
  (applications) => {
    const app = applications.find(app => app.offerId === offerId);
    return app?.id;
  }
);

// Count selectors
export const selectApplicationsCount = createSelector(
  selectAllApplications,
  (applications) => applications.length
);

export const selectApplicationsByStatus = (status: string) => createSelector(
  selectAllApplications,
  (applications) => applications.filter(app => app.status === status)
);

export const selectPendingCount = createSelector(
  selectAllApplications,
  (applications) => applications.filter(app => app.status === 'pending').length
);

export const selectAcceptedCount = createSelector(
  selectAllApplications,
  (applications) => applications.filter(app => app.status === 'accepted').length
);

export const selectRejectedCount = createSelector(
  selectAllApplications,
  (applications) => applications.filter(app => app.status === 'rejected').length
);

// Sort selectors
export const selectApplicationsSortedByDate = createSelector(
  selectAllApplications,
  (applications) => [...applications].sort((a, b) =>
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )
);

export const selectRecentApplications = (limit: number = 5) => createSelector(
  selectApplicationsSortedByDate,
  (applications) => applications.slice(0, limit)
);
