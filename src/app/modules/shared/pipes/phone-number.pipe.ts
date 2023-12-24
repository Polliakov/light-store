import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: number | string): number | string {
    try {
      let phoneRaw = value + '';
      if (phoneRaw.length == 11)
        return phoneRaw.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
      else if (phoneRaw.length == 6)
        return phoneRaw.replace(/(\d{3})(\d{3})/, '$1-$2')
      else
        return value;
    }
    catch {
      return value;
    }
  }
}
