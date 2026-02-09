import {Component} from '@angular/core';
import {UiInput} from '../../../shared/components/ui-input/ui-input';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UiButton} from '../../../shared/components/ui-button/ui-button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    UiInput,
    UiButton,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  form: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {validators: this.passwordsMatchValidator}
    )
  }

  passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : {passwordsMismatch: true};
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Register form submitted:', this.form.value);
  }

  get name() {
    return this.form.controls.name;
  }
  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }
}
