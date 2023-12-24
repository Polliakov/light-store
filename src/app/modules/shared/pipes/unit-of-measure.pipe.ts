import { Pipe, PipeTransform } from '@angular/core';
import { UnitOfMeasure } from '../models/unit-of-measure';

@Pipe({
  name: 'unitOfMeasure'
})
export class UnitOfMeasurePipe implements PipeTransform {
  transform(value: UnitOfMeasure): string {
    switch(value) {
      case UnitOfMeasure.unit:        return 'шт.';
      case UnitOfMeasure.linearMeter: return 'м';
      case UnitOfMeasure.squareMeter: return 'м²';
      default: return 'ед.';
    }
  }
}
