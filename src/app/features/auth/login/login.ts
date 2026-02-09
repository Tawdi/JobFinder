import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiInput} from '../../../shared/components/ui-input/ui-input';
import {UiButton} from '../../../shared/components/ui-button/ui-button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, UiInput, UiButton, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
form :any
  constructor(private fb: FormBuilder) {

    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
    )
  }


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Login form submitted:', this.form.value);
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }
}
