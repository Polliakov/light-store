import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductInOrderDto } from '../../models/dtos/product-in-order-dto';
import { ICreateOrderItem } from '../../models/create-order-item';

@Component({
  selector: 'app-create-order-item',
  templateUrl: './create-order-item.component.html',
  styleUrls: ['./create-order-item.component.scss']
})
export class CreateOrderItemComponent {
  @Input() item: ICreateOrderItem;
  @Output() countChange = new EventEmitter<IProductInOrderDto>();
  @Output() selectionChange = new EventEmitter<ICreateOrderItem>();

  onCountChange() {
    if (this.item.count < 1)
      this.item.count = 1;
    this.countChange.emit({productId: this.item.productId, count: this.item.count});
  }

  onCbChanged(checked: boolean) {
    this.item.selected = checked;
    this.selectionChange.emit(this.item);
  }
}
