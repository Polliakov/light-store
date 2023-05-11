import { Predicate } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function predicateValidator(predicate: Predicate<any>, errorName: string = 'predicate'): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    let valid = predicate(control.value);
    if (valid) return null;
    return { [errorName]: true };
  }
}
