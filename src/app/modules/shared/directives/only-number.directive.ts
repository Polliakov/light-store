import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

export enum DecimalSeparator {
  comma = ',',
  point = '.'
}

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective implements OnInit{
  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    if (this.precision) {
      this.maxIntegerLength = this.scale ?
        this.precision - this.scale :
        this.precision;
    }
    this.onValueChange(this.el.nativeElement.value);
  }

  @Input() precision: number;
  @Input() scale: number;
  @Input() signed = false;
  @Input() decimalSeparator = DecimalSeparator.comma;

  private maxIntegerLength: number;
  private previousValidValue: string;

  @HostListener('ngModelChange', ['$event'])
  onModelChange(eventValue: any) {
    if (this.previousValidValue == eventValue) return;
    this.onValueChange(eventValue);
  }

  @HostListener('change')
  onChange() {
    let value: string = this.el.nativeElement.value + '';

    if (value.at(0) == this.decimalSeparator)
      value = 0 + value;
    if (value.at(-1) == this.decimalSeparator)
      value = value + 0;
    if (value.at(0) == '-' && !value.at(1)?.match(/\d/))
      value = '-0' + value.slice(1);

    // Truncate leading 0s.
    value = value.replace(/\b((?<![,.])0(?!\b))+/, '');

    this.el.nativeElement.value = value;
  }

  onValueChange(value: string | number) {
    if (value == null) return;
    let newValue: string;
    value = value + '';

    if (this.scale > 0) {
      newValue = this.onlyDecimal(value);
    }
    else {
      newValue = this.onlyInteger(value);
    }

    this.previousValidValue = newValue;
    this.el.nativeElement.value = newValue;
  }

  onlyDecimal(value: string): string {
    if (this.decimalSeparator != DecimalSeparator.point)
      value = value.replace(this.decimalSeparator, DecimalSeparator.point);

    let separatorIndex = value.lastIndexOf(DecimalSeparator.point);
    let hasSeparator = separatorIndex != -1;

    let integer = hasSeparator ? value.slice(0, separatorIndex) : value;
    let newValue = this.signed ?
      this.toSignedInteger(integer) :
      this.toInteger(integer);

    if (integer.length > this.maxIntegerLength)
      return this.previousValidValue;

    if (hasSeparator) {
      let fractional = value.slice(separatorIndex + 1);

      if (fractional.length > this.scale)
        return this.previousValidValue;

      newValue = newValue + `${this.decimalSeparator}${this.toInteger(fractional)}`;
    }

    return newValue;
  }

  onlyInteger(value: string): string {
    let newValue = this.signed ?
      this.toSignedInteger(value) :
      this.toInteger(value);

    if (newValue.length > this.maxIntegerLength)
      newValue = this.previousValidValue;

    return newValue;
  }

  toInteger(value: string) {
    return value.replace(/\D/g, '');
  }

  toSignedInteger(value: string) {
    let hasSign = value[0] == '-';
    value = value.replace(/\D/g, '');
    if (hasSign)
      value = '-' + value;
    return value;
  }
}
