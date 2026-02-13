import {Component, signal} from '@angular/core';
import {UiInput} from '../../../shared/components/ui-input/ui-input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiButton} from '../../../shared/components/ui-button/ui-button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth';
import {finalize} from 'rxjs';
import {ToastService} from '../../../core/services/toast';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    UiInput,
    UiButton,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  form: any;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>("");

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {
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

    if (pass === confirm) {
      form.get('confirmPassword')?.setErrors(null);
      return null;
    } else {
      form.get('confirmPassword')?.setErrors({passwordsMismatch: true});
      return {passwordsMismatch: true};
    }
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set("");

    const credentials = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.register(credentials).pipe(
      finalize(() => {
        this.isLoading.set(false);
      })
    ).subscribe({
      next: (user) => {
        console.log('Registration successful:', user);
        this.router.navigate(['/login']);
        this.toast.show('Account created! You can login now.', 'success');
      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Registration failed. Please try again.');
        console.error('Registration error:', error);
      }
    })


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
