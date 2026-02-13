import {Component, inject, OnInit, signal} from '@angular/core';
import {UiInput} from '../../shared/components/ui-input/ui-input';
import {UiButton} from '../../shared/components/ui-button/ui-button';
import {ProfileService} from '../../core/services/profile';
import {AuthService} from '../../core/services/auth';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../core/services/toast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UiInput, UiButton, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private toast = inject(ToastService)
  private profileService = inject(ProfileService);
  private auth = inject(AuthService);

  user = signal<any>(null);

  ngOnInit() {
    this.auth.user$.subscribe(u => {
      if (u) {
        this.user.set({...u});
      }
    });
  }

  save() {
    const u = this.user();
    this.profileService.updateProfile(u.id, u).subscribe({
      next: () => {
        this.toast.show('Profile updated successfully', 'success');
      }, error: () => {
        this.toast.show('Failed to update profile', 'error');
      }
    });
  }

  deleteAccount() {
    const u = this.user();
    this.profileService.deleteAccount(u.id).subscribe({
      next: () => {
        this.toast.show('Account deleted', 'error');
      }, error: () => {
        this.toast.show('Failed to delete account', 'error');
      }
    });
  }

}
