import { Component } from '@angular/core';
import {UiInput} from '../../shared/components/ui-input/ui-input';
import {UiButton} from '../../shared/components/ui-button/ui-button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    UiInput,
    UiButton,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {



}
