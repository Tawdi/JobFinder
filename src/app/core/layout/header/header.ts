import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ToastService} from '../../services/toast';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  private auth = inject(AuthService);
  private toast = inject(ToastService);
  mobileOpen = false;
  user = signal<any>(null);

  ngOnInit() { this.auth.user$.subscribe(u => this.user.set(u)); }

  logout() {
    this.auth.logout();
    this.toast.show('Logged out successfully', 'info');
  }
}
