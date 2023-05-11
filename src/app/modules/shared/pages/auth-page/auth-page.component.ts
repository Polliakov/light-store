import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { UserRole } from '../../models/user-role';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(128)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(32)
    ]),
  });

  isBtnSubmitDisabled = false;
  isAuthFailed = false;

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isAuthFailed = false;
    this.isBtnSubmitDisabled = true;

    this.authService.signIn(this.email.value!, this.password.value!)
      .subscribe({
        next: r => {
          this.navigateByRole(r.appUser.role);
        },
        error: status => {
          if (status = HttpStatusCode.Unauthorized)
            this.isAuthFailed = true;
          this.isBtnSubmitDisabled = false;
        }});
  }

  private navigateByRole(role: UserRole) {
    switch (role) {
      case UserRole.customer:
        this.router.navigate(['/products']);
        break;
      case UserRole.admin:
        this.router.navigate(['/admin']);
        break;
      case UserRole.employee:
        this.router.navigate(['/employee']);
        break;
    }
  }
}
