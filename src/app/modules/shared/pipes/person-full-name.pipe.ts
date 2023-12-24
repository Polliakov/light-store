import { Pipe, PipeTransform } from '@angular/core';
import { IPerson } from '../models/person';

@Pipe({
  name: 'personFullName'
})
export class PersonFullNamePipe implements PipeTransform {

  transform(person: IPerson): string {
    if (!person)
      return 'Нет данных';
    return `${person.surname} ${person.name}${(person.patronymic ? ` ${person.patronymic}` : '')}`;
  }
}
