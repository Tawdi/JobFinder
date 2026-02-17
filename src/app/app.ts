import {Component, OnInit} from '@angular/core';
import {Layout} from './core/layout/layout';
import {AuthService} from './core/services/auth';
import {FavoritesActions} from './core/store/actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private auth: AuthService,
    private store: Store) {
  }

  ngOnInit() {
    this.auth.autoLogin();
    this.auth.user$.subscribe(user => {
      if (user) {
        // User is logged in, load their favorites
        this.store.dispatch(FavoritesActions.loadFavorites({
          userId: user.id
        }));
      }
    });
  }
}
