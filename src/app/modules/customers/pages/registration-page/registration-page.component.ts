import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageGetter } from 'src/app/modules/shared/components/form-error/form-error.component';
import { CustomerService } from 'src/app/modules/customers/services/customer.service';
import { predicateValidator } from 'src/app/modules/shared/validators/predicate-validator';
import { nonWhitespace } from '../../../shared/validators/non-whitespace-validator';
import { nonWhitespaceOrNull } from '../../../shared/validators/non-wihitespace-or-null-validator';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {

  }

  form: FormGroup = new FormGroup({
    surname: new FormControl<string>('', [
      nonWhitespaceOrNull(),
      Validators.minLength(2),
      Validators.maxLength(128)
    ]),
    name: new FormControl<string>('', [
      nonWhitespaceOrNull(),
      Validators.minLength(2),
      Validators.maxLength(128)
    ]),
    patronymic: new FormControl<string>('', [
      nonWhitespace(),
      Validators.minLength(2),
      Validators.maxLength(128)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(128)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32)
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      predicateValidator(v => v === this.form?.controls.password.value, 'match')
    ]),
    agreement: new FormControl<boolean>(false, [
      Validators.requiredTrue
    ])
  });

  passwordRepeatMessages: [string, MessageGetter][] = [
    ['match', () => 'Пароли не совпадают']
  ];

  isBtnSubmitDisabled = false;
  isEmailOccupied = false;

// #region getters
  get surname() {
    return this.form.controls.surname;
  }
  get name() {
    return this.form.controls.name;
  }
  get patronymic() {
    return this.form.controls.patronymic;
  }
  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }
  get passwordRepeat() {
    return this.form.controls.passwordRepeat;
  }
  get agreement() {
    return this.form.controls.agreement;
  }
// #endregion

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isBtnSubmitDisabled = true;
    this.isEmailOccupied = false;
    let {passwordRepeat, agreement, ...dto} = this.form.value;
    if (dto.patronymic == '')
      dto.patronymic = null;
    this.customerService.signUp(dto).subscribe({
      next: () => this.router.navigate(['/']),
      error: s => {
        if (s == HttpStatusCode.Conflict)
          this.isEmailOccupied = true;
        this.isBtnSubmitDisabled = false;
      }
    });
  }
}
