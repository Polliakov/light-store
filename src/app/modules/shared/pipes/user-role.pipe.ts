import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../models/user-role';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: UserRole): string {
    switch(value) {
      case UserRole.customer: return 'покупатель';
      case UserRole.employee: return 'сотрудник';
      case UserRole.admin:    return 'администратор';
      default: return 'неизвесная роль';
    }
  }
}
