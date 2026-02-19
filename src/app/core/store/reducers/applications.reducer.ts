import {createReducer, on} from '@ngrx/store';
import {Application} from '../../models/application.model';
import {ApplicationsActions} from '../actions';

export interface ApplicationsState {
  applications: Application[];
  selectedApplication: Application | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  loadingApplicationIds: Set<string>;
}

export const initialApplicationsState: ApplicationsState = {
  applications: [],
  selectedApplication: null,
  loading: false,
  error: null,
  success: null,
  loadingApplicationIds: new Set()
};

export const applicationsReducer = createReducer(
  initialApplicationsState,

  // Load Applications
  on(ApplicationsActions.loadApplications, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(ApplicationsActions.loadApplicationsSuccess, (state, {applications}) => ({
    ...state,
    applications,
    loading: false,
    error: null
  })),

  on(ApplicationsActions.loadApplicationsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Application
  on(ApplicationsActions.loadApplication, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ApplicationsActions.loadApplicationSuccess, (state, {application}) => ({
    ...state,
    selectedApplication: application,
    loading: false,
    error: null
  })),

  on(ApplicationsActions.loadApplicationFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Application
  on(ApplicationsActions.addApplication, (state, {application}) => ({
    ...state,
    loadingApplicationIds: new Set(state.loadingApplicationIds).add(application.offerId),
    error: null,
    success: null
  })),

  on(ApplicationsActions.addApplicationSuccess, (state, {application}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(application.offerId);
    return {
      ...state,
      applications: [application, ...state.applications],
      loadingApplicationIds: newLoadingIds,
      success: 'Application added successfully',
      error: null
    };
  }),

  on(ApplicationsActions.addApplicationFailure, (state, {error, offerId}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(offerId);
    return {
      ...state,
      loadingApplicationIds: newLoadingIds,
      error
    };
  }),

  // Update Application Status
  on(ApplicationsActions.updateApplicationStatus, (state, {id}) => ({
    ...state,
    loadingApplicationIds: new Set(state.loadingApplicationIds).add(id.toString()),
    error: null,
    success: null
  })),

  on(ApplicationsActions.updateApplicationStatusSuccess, (state, {application}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(application.id.toString());
    return {
      ...state,
      applications: state.applications.map(app =>
        app.id === application.id ? application : app
      ),
      selectedApplication: state.selectedApplication?.id === application.id ? application : state.selectedApplication,
      loadingApplicationIds: newLoadingIds,
      success: 'Application status updated successfully',
      error: null
    };
  }),

  on(ApplicationsActions.updateApplicationStatusFailure, (state, {error, id}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(id.toString());
    return {
      ...state,
      loadingApplicationIds: newLoadingIds,
      error
    };
  }),

  // Update Application Notes
  on(ApplicationsActions.updateApplicationNotes, (state, {id}) => ({
    ...state,
    loadingApplicationIds: new Set(state.loadingApplicationIds).add(id.toString()),
    error: null,
    success: null
  })),

  on(ApplicationsActions.updateApplicationNotesSuccess, (state, {application}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(application.id.toString());
    return {
      ...state,
      applications: state.applications.map(app =>
        app.id === application.id ? application : app
      ),
      selectedApplication: state.selectedApplication?.id === application.id ? application : state.selectedApplication,
      loadingApplicationIds: newLoadingIds,
      success: 'Notes updated successfully',
      error: null
    };
  }),

  on(ApplicationsActions.updateApplicationNotesFailure, (state, {error, id}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(id.toString());
    return {
      ...state,
      loadingApplicationIds: newLoadingIds,
      error
    };
  }),

  // Remove Application
  on(ApplicationsActions.removeApplication, (state, {id}) => ({
    ...state,
    loadingApplicationIds: new Set(state.loadingApplicationIds).add(id.toString()),
    error: null,
    success: null
  })),

  on(ApplicationsActions.removeApplicationSuccess, (state, {id}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(id.toString());
    return {
      ...state,
      applications: state.applications.filter(app => app.id !== id),
      selectedApplication: state.selectedApplication?.id === id ? null : state.selectedApplication,
      loadingApplicationIds: newLoadingIds,
      success: 'Application removed successfully',
      error: null
    };
  }),

  on(ApplicationsActions.removeApplicationFailure, (state, {error, id}) => {
    const newLoadingIds = new Set(state.loadingApplicationIds);
    newLoadingIds.delete(id.toString());
    return {
      ...state,
      loadingApplicationIds: newLoadingIds,
      error
    };
  }),

  // Select Application
  on(ApplicationsActions.selectApplication, (state, {application}) => ({
    ...state,
    selectedApplication: application
  })),

  // Clear Messages
  on(ApplicationsActions.clearApplicationsMessages, (state) => ({
    ...state,
    error: null,
    success: null
  }))
);
