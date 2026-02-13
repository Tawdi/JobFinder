import {Component, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UiInput} from '../../../shared/components/ui-input/ui-input';
import {UiButton} from '../../../shared/components/ui-button/ui-button';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth';
import {ToastService} from '../../../core/services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, UiInput, UiButton, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form: any;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>("");


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
  ) {

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
    this.isLoading.set(true);
    this.errorMessage.set("");
    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(credentials).subscribe(
      {
        next: (user) => {
          this.isLoading.set(false);
          console.log('Login successful:', user);
          this.router.navigate(['/profile']);
          this.toast.show(`Welcome back, ${user.name}! `, 'success');
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.message || 'Login failed. Please try again.');
          console.error('Login error:', error);
        },

      }
    )

    console.log('Login form submitted:', this.form.value);
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }
}
