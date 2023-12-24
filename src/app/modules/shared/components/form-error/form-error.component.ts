import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface MessageGetter {
  (error: any): string
}

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  private static _messages = new Map<string, MessageGetter>([
    ['required', () => 'Поле обязательно'],
    ['requiredtrue', () => 'Поле обязательно'],
    ['whitespaceOrNull', () => 'Поле обязательно'],
    ['whitespace', () => 'Значение не должно состоять только из пробелов'],
    ['email', () => 'Некорректный адрес почты'],
    ['match', () => 'Значения не совпадают'],
    ['minlength', (error) => `Минимальная длина ${error.requiredLength}`],
    ['maxlength', (error) => `Максимальная длина ${error.requiredLength}`],
    ['predicate', () => 'Значение не соответствует условию'],
    ['invalidPhoneNumber', () => 'Некорректный номер телефона']
  ]);
  private static defaultMessage = () => 'Поле не валидно';

  @Input() control: AbstractControl;
  @Input() set messages(value: [string, MessageGetter][]) {
    this.customMessages = new Map<string, MessageGetter>(value);
  }

  private customMessages: Map<string, MessageGetter>;

  get controlErrors() {
    return this.control.errors ? Object.entries(this.control.errors) : [];
  }

  getMessage(error: [string, any]): string {
    let handler = this.customMessages?.get(error[0])
      ?? FormErrorComponent._messages.get(error[0])
      ?? FormErrorComponent.defaultMessage;

    return handler(error[1]);
  }
}
