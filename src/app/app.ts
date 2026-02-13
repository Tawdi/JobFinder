import {Component, OnInit} from '@angular/core';
import {Layout} from './core/layout/layout';
import {AuthService} from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.autoLogin();
  }
}
