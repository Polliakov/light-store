import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nonWhitespaceOrNull(errorName: string = 'whitespaceOrNull'): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {

    return control.value?.trim() ? null : { [errorName]: true };
  }
}
