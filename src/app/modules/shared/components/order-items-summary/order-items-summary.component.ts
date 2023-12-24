import { Component, Input } from '@angular/core';
import { IOrderItem } from '../../models/order-item';

@Component({
  selector: 'app-order-items-summary',
  templateUrl: './order-items-summary.component.html',
  styleUrls: ['./order-items-summary.component.scss']
})
export class OrderItemsSummaryComponent {
  @Input() items: IOrderItem[];

  calculateTotal() {
    return this.items.reduce((acc, i) => acc + i.price * i.count, 0);
  }
}
