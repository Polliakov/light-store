import { Directive, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][phoneMask]',
})
export class PhoneMaskDirective implements OnInit {
  constructor(public ngControl: NgControl) {

  }

  private previousVal: any;

  ngOnInit() {
    this.onInputChange(this.ngControl.control?.value + '', false);
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    if (this.previousVal == event) return;
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    event.preventDefault();
    this.onInputChange(event.target.value, true);
  }

  onInputChange(value: string, backspace: boolean) {
    let newVal = value.replace(/\D/g, '');
    if (backspace) {
      newVal = newVal.substring(0, newVal.length - 1);
    }

    if (newVal.length == 1) {
      newVal = `+${newVal} `;
    }
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d)(\d{0,2})/, '+$1 ($2');
    }
    else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d)(\d{3})(\d{0,2})/, '+$1 ($2) $3');
    }
    else if (newVal.length <= 8) {
      newVal = newVal.replace(/^(\d)(\d{3})(\d{3})(\d?)/, '+$1 ($2) $3-$4');
    }
    else {
      newVal = newVal.substring(0, 11);
      newVal = newVal.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{0,2})/, '+$1 ($2) $3-$4-$5');
    }
    this.previousVal = newVal;
    this.ngControl.control?.setValue(newVal);
  }
}
