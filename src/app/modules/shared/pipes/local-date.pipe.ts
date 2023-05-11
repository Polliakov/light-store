import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {
  private datePipe = new DatePipe('ru');

  transform(value: string | number | Date, format: string | undefined): unknown {
    return this.datePipe.transform(value.toString() + 'Z', format);
  }
}
