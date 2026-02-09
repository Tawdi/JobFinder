import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [],
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.css',
  host: { 'class': 'block w-full'}
})
export class UiInput {

  @Input() label: string = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() error = '';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() iconLeft = false;
  @Input() iconRight = false;

}
