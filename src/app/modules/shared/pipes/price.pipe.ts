import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 2,
      minimumFractionDigits: (value % 1 > 0) ? 2 : 0
    }).format(value);
  }
}
