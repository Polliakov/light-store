import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function phoneNumber(length: number = 11, errorName: string = 'invalidPhoneNumber'): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    let phoneRaw = String(control.value)?.replace(/\D/g, '');
    if (!phoneRaw) return null;

    if (phoneRaw.length != length)
      return {
        [errorName]: {
          requiredLength: length,
          actualLength: phoneRaw.length,
        }
      };

    return null;
  }
}
