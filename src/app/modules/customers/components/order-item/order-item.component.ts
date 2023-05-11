import { Component, Input } from '@angular/core';
import { IOrderItem } from 'src/app/modules/shared/models/order-item';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
  @Input() item: IOrderItem;
}
