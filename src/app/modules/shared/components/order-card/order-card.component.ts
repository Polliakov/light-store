import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../models/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order: IOrder;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick() {
    this.cardClick.emit(this.order.id);
  }
}
