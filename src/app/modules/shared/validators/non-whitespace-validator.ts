import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nonWhitespace(errorName: string = 'whitespace'): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {

    if (!control.value || control.value.trim()) return null;
    return { [errorName]: true };
  }
}
