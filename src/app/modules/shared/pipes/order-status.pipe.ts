import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../models/order-status';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.created:
        return 'Новый';
      case OrderStatus.ready:
        return 'Готов к получению';
      case OrderStatus.finished:
        return 'Завершён';
      case OrderStatus.cancelled:
        return 'Отменён';
      default:
        return 'Неизвестный статус'
    }
  }
}
