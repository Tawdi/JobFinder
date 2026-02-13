import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from './footer/footer';
import {Header} from './header/header';
import {Toast} from '../../shared/components/toast/toast';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Footer,
    Header,
    Toast
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
