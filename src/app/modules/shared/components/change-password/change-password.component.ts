import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { predicateValidator } from '../../validators/predicate-validator';
import { MessageGetter } from '../form-error/form-error.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(
    private authService: AuthService
  ) {

  }

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl<string>('', [
      Validators.required
    ]),
    newPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32)
    ]),
    newPasswordRepeat: new FormControl('', [
      Validators.required,
      predicateValidator(v => v === this.form?.controls.newPassword.value, 'match')
    ])
  });

  passwordRepeatMessages: [string, MessageGetter][] = [
    ['match', () => 'Пароли не совпадают']
  ];

  isBtnSubmitDisabled = false;
  wrongPassword = false;

// #region getters
  get oldPassword() {
    return this.form.controls.oldPassword;
  }
  get newPassword() {
    return this.form.controls.newPassword;
  }
  get newPasswordRepeat() {
    return this.form.controls.newPasswordRepeat;
  }
// #endregion

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isBtnSubmitDisabled = true;
    this.wrongPassword = false;

    let {newPasswordRepeat, ...dto} = this.form.value;

    this.authService.changePassword(dto).subscribe({
      error: status => {
        if (status == HttpStatusCode.Unauthorized)
          this.wrongPassword = true;
        this.isBtnSubmitDisabled = false;
      }
    });
  }
}
