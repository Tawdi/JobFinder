// src/app/features/profile/profile.ts
import {Component, inject, OnInit, signal, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UiInput} from '../../shared/components/ui-input/ui-input';
import {UiButton} from '../../shared/components/ui-button/ui-button';
import {UiModal} from '../../shared/components/ui-modal/ui-modal';
import {ProfileService} from '../../core/services/profile';
import {AuthService} from '../../core/services/auth';
import {ToastService} from '../../core/services/toast';
import {AppState} from '../../core/store/reducers';
import * as ApplicationsSelectors from '../../core/store/selectors/applications.selector';
import * as FavoritesSelectors from '../../core/store/selectors/favorites.selector';
import {ProfileStats} from './profile-stats/profile-stats';
import {ProfileQuickActions} from './profile-quick-actions/profile-quick-actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiInput,
    UiButton,
    UiModal,
    RouterLink,
    ProfileStats,
    ProfileQuickActions
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private toast = inject(ToastService);
  private profileService = inject(ProfileService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store<AppState>);

  // User data
  user = signal<any>(null);
  originalUser = signal<any>(null);

  // Edit modes
  isEditing = signal<Record<string, boolean>>({
    name: false,
    email: false,
    password: false
  });

  // Password fields
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');

  // Modal state
  showDeleteModal = false;

  // Statistics from NgRx store
  applicationsCount$: Observable<number>;
  pendingCount$: Observable<number>;
  acceptedCount$: Observable<number>;
  rejectedCount$: Observable<number>;
  favoritesCount$: Observable<number>;

  // Computed values
  hasChanges = computed(() => {
    const current = this.user();
    const original = this.originalUser();
    if (!current || !original) return false;
    return current.name !== original.name || current.email !== original.email;
  });

  passwordMatch = computed(() => {
    return this.newPassword() === this.confirmPassword() && this.newPassword().length >= 6;
  });

  constructor() {
    // Initialize store selectors
    this.applicationsCount$ = this.store.select(ApplicationsSelectors.selectApplicationsCount);
    this.pendingCount$ = this.store.select(ApplicationsSelectors.selectPendingCount);
    this.acceptedCount$ = this.store.select(ApplicationsSelectors.selectAcceptedCount);
    this.rejectedCount$ = this.store.select(ApplicationsSelectors.selectRejectedCount);
    this.favoritesCount$ = this.store.select(FavoritesSelectors.selectFavoritesCount);
  }

  ngOnInit() {
    this.auth.user$.subscribe(u => {
      if (u) {
        this.user.set({...u});
        this.originalUser.set({...u});
      }
    });
  }

  // Edit mode toggles
  toggleEdit(field: string) {
    this.isEditing.update(state => ({
      ...state,
      [field]: !state[field]
    }));
  }

  cancelEdit(field: string) {
    // Revert to original value
    this.user.update(u => ({
      ...u,
      [field]: this.originalUser()?.[field]
    }));
    this.toggleEdit(field);
  }

  // Save profile changes
  save() {
    const u = this.user();
    if (!u) return;

    this.profileService.updateProfile(u.id, u).subscribe({
      next: (updatedUser) => {
        this.toast.show('Profile updated successfully', 'success');
        this.originalUser.set({...updatedUser});
        // Reset edit modes
        this.isEditing.set({name: false, email: false, password: false});
      },
      error: (err) => {
        this.toast.show(err.message || 'Failed to update profile', 'error');
      }
    });
  }

  // Change password
  changePassword() {
    if (!this.passwordMatch()) {
      this.toast.show('Passwords do not match or are too short', 'error');
      return;
    }

    this.profileService.changePassword(
      this.user().id,
      this.currentPassword(),
      this.newPassword()
    ).subscribe({
      next: () => {
        this.toast.show('Password changed successfully', 'success');
        this.currentPassword.set('');
        this.newPassword.set('');
        this.confirmPassword.set('');
        this.toggleEdit('password');
      },
      error: (err) => {
        this.toast.show(err.message || 'Failed to change password', 'error');
      }
    });
  }

  // Delete account
  confirmDelete() {
    this.showDeleteModal = true;
  }

  deleteAccount() {
    const u = this.user();
    if (!u) return;

    this.profileService.deleteAccount(u.id).subscribe({
      next: () => {
        this.toast.show('Account deleted successfully', 'error');
        this.showDeleteModal = false;
        setTimeout(() => {
          this.auth.logout();
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        this.toast.show(err.message || 'Failed to delete account', 'error');
        this.showDeleteModal = false;
      }
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
  }

  // Helper methods
  getInitials(): string {
    const u = this.user();
    if (!u || !u.name) return 'U';
    return u.name
      .split(' ')
      .map((n: string) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
