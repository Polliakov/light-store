import { Component, Input } from '@angular/core';
import { IOrderItem } from '../../models/order-item';

@Component({
  selector: 'app-order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss']
})
export class OrderItemsListComponent {
  @Input() items: IOrderItem[];
}
