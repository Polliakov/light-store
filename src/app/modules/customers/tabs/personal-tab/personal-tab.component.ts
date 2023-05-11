import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, first } from 'rxjs';
import { IUser } from 'src/app/modules/shared/models/user';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { nonWhitespace } from 'src/app/modules/shared/validators/non-whitespace-validator';
import { nonWhitespaceOrNull } from 'src/app/modules/shared/validators/non-wihitespace-or-null-validator';
import { ICustomer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { IUpdateCustomerDto } from '../../models/dtos/update-customer-dto'


@Component({
  selector: 'app-personal-tab',
  templateUrl: './personal-tab.component.html',
  styleUrls: ['./personal-tab.component.scss']
})
export class PersonalTabComponent implements OnInit{
  constructor(
    private customerService: CustomerService,
    private userService: AuthService
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
  });
  previusFormValue: any;
  email: string;
  appUserId: string;

  loading = false;
  isEditMode = false;
  isBtnSubmitDisabled = false;

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
// #endregion

  ngOnInit() {
    this.loading = true;

    combineLatest({
      customer: this.customerService.customer$.pipe(first()),
      user: this.userService.user$.pipe(first())
    }).subscribe(result => {
      this.initForm(result.customer, result.user);
      this.previusFormValue = this.form.value;
      this.loading = false;
    });
  }

  submit() {
    let dto: IUpdateCustomerDto = this.form.value;
    this.customerService.update(dto).subscribe({
      next: () => {
        this.previusFormValue = this.form.value;
        this.isEditMode = false;
      }
    });
  }

  edit() {
    this.isEditMode = true;
  }

  cancellEdit() {
    this.form.setValue(this.previusFormValue);
    this.isEditMode = false;
  }

  private initForm(customer: ICustomer | null, user: IUser | null) {
    if (!customer || !user) return;
    this.email = user.email;
    this.name.setValue(customer.name);
    this.surname.setValue(customer.surname);
    this.patronymic.setValue(customer.patronymic);
  }
}
