import {createAction, props} from '@ngrx/store';
import {AddApplicationDto, Application, ApplicationStatus} from '../../models/application.model';

// Load Applications
export const loadApplications = createAction(
  '[Applications] Load Applications',
  props<{ userId: number }>()
);

export const loadApplicationsSuccess = createAction(
  '[Applications] Load Applications Success',
  props<{ applications: Application[] }>()
);

export const loadApplicationsFailure = createAction(
  '[Applications] Load Applications Failure',
  props<{ error: string }>()
);

// Load Single Application
export const loadApplication = createAction(
  '[Applications] Load Application',
  props<{ id: number }>()
);

export const loadApplicationSuccess = createAction(
  '[Applications] Load Application Success',
  props<{ application: Application }>()
);

export const loadApplicationFailure = createAction(
  '[Applications] Load Application Failure',
  props<{ error: string }>()
);

// Add Application
export const addApplication = createAction(
  '[Applications] Add Application',
  props<{ application: AddApplicationDto }>()
);

export const addApplicationSuccess = createAction(
  '[Applications] Add Application Success',
  props<{ application: Application }>()
);

export const addApplicationFailure = createAction(
  '[Applications] Add Application Failure',
  props<{ error: string; offerId: string }>()
);

// Update Application Status
export const updateApplicationStatus = createAction(
  '[Applications] Update Application Status',
  props<{ id: number; status: ApplicationStatus }>()
);

export const updateApplicationStatusSuccess = createAction(
  '[Applications] Update Application Status Success',
  props<{ application: Application }>()
);

export const updateApplicationStatusFailure = createAction(
  '[Applications] Update Application Status Failure',
  props<{ error: string; id: number }>()
);

// Update Application Notes
export const updateApplicationNotes = createAction(
  '[Applications] Update Application Notes',
  props<{ id: number; notes: string }>()
);

export const updateApplicationNotesSuccess = createAction(
  '[Applications] Update Application Notes Success',
  props<{ application: Application }>()
);

export const updateApplicationNotesFailure = createAction(
  '[Applications] Update Application Notes Failure',
  props<{ error: string; id: number }>()
);

// Remove Application
export const removeApplication = createAction(
  '[Applications] Remove Application',
  props<{ id: number }>()
);

export const removeApplicationSuccess = createAction(
  '[Applications] Remove Application Success',
  props<{ id: number }>()
);

export const removeApplicationFailure = createAction(
  '[Applications] Remove Application Failure',
  props<{ error: string; id: number }>()
);

// Select Application
export const selectApplication = createAction(
  '[Applications] Select Application',
  props<{ application: Application }>()
);

// Check if already applied
export const checkApplicationStatus = createAction(
  '[Applications] Check Application Status',
  props<{ userId: number; offerId: string }>()
);

export const checkApplicationStatusSuccess = createAction(
  '[Applications] Check Application Status Success',
  props<{ hasApplied: boolean; applicationId?: number }>()
);

// Clear Messages
export const clearApplicationsMessages = createAction('[Applications] Clear Messages');
