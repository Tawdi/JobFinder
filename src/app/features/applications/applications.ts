import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Spinner } from '../../shared/components/spinner/spinner';
import { Application, ApplicationStatus } from '../../core/models/application.model';
import { AppState } from '../../core/store/reducers';
import { AuthService } from '../../core/services/auth';
import {ApplicationsActions} from '../../core/store/actions';
import {ApplicationsSelectors} from '../../core/store/selectors';

import { ApplicationStats } from './application-stats/application-stats';
import { ApplicationCard } from './application-card/application-card';
import { ApplicationStatusModal } from './application-status-modal/application-status-modal';
import { ApplicationNotesModal } from './application-notes-modal/application-notes-modal';
import { ApplicationRemoveModal } from './application-remove-modal/application-remove-modal';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Spinner,
    ApplicationStats,
    ApplicationCard,
    ApplicationStatusModal,
    ApplicationNotesModal,
    ApplicationRemoveModal
  ],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Applications implements OnInit {
  applications$: Observable<Application[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  success$: Observable<string | null>;
  applicationsCount$: Observable<number>;

  // Statistics
  pendingCount$: Observable<number>;
  acceptedCount$: Observable<number>;
  rejectedCount$: Observable<number>;

  // Modal state
  showStatusModal = false;
  showNotesModal = false;
  showRemoveModal = false;
  selectedApplication: Application | null = null;

  // Filter state
  activeFilter: ApplicationStatus | 'all' = 'all';

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.applications$ = this.store.select(ApplicationsSelectors.selectAllApplications);
    this.loading$ = this.store.select(ApplicationsSelectors.selectApplicationsLoading);
    this.error$ = this.store.select(ApplicationsSelectors.selectApplicationsError);
    this.success$ = this.store.select(ApplicationsSelectors.selectApplicationsSuccess);
    this.applicationsCount$ = this.store.select(ApplicationsSelectors.selectApplicationsCount);

    // Statistics
    this.pendingCount$ = this.store.select(ApplicationsSelectors.selectPendingCount);
    this.acceptedCount$ = this.store.select(ApplicationsSelectors.selectAcceptedCount);
    this.rejectedCount$ = this.store.select(ApplicationsSelectors.selectRejectedCount);
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    const currentUser = this.authService.user$.value;
    if (currentUser) {
      this.store.dispatch(ApplicationsActions.loadApplications({
        userId: currentUser.id
      }));
    }
  }

  // Filter applications
  setFilter(filter: ApplicationStatus | 'all') {
    this.activeFilter = filter;

    if (filter === 'all') {
      this.applications$ = this.store.select(ApplicationsSelectors.selectAllApplications);
    } else {
      this.applications$ = this.store.select(
        ApplicationsSelectors.selectApplicationsByStatus(filter)
      );
    }
  }

  // Modal handlers
  openStatusModal(application: Application) {
    this.selectedApplication = application;
    this.showStatusModal = true;
  }

  openNotesModal(application: Application) {
    this.selectedApplication = application;
    this.showNotesModal = true;
  }

  openRemoveModal(application: Application) {
    this.selectedApplication = application;
    this.showRemoveModal = true;
  }

  // Action handlers
  updateStatus(event: {id: number, status: ApplicationStatus}) {
    this.store.dispatch(ApplicationsActions.updateApplicationStatus(event));
    this.showStatusModal = false;
    this.selectedApplication = null;
  }

  updateNotes(event: {id: number, notes: string}) {
    this.store.dispatch(ApplicationsActions.updateApplicationNotes(event));
    this.showNotesModal = false;
    this.selectedApplication = null;
  }

  removeApplication(id: number) {
    this.store.dispatch(ApplicationsActions.removeApplication({ id }));
    this.showRemoveModal = false;
    this.selectedApplication = null;
  }

  closeModals() {
    this.showStatusModal = false;
    this.showNotesModal = false;
    this.showRemoveModal = false;
    this.selectedApplication = null;
  }

  clearMessages() {
    this.store.dispatch(ApplicationsActions.clearApplicationsMessages());
  }
}
