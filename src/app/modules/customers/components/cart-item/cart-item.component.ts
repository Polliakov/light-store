import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from 'src/app/modules/customers/models/cart-item';
import { ICartItemDto } from 'src/app/modules/customers/models/dtos/cart-item-dto';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item: ICartItem;
  @Output() countChange = new EventEmitter<ICartItemDto>();
  @Output() remove = new EventEmitter<string>();

  onCountChange(): void {
    if (this.item.count < 1) {
      this.remove.emit(this.item.id);
      return;
    }
    this.countChange.emit({productId: this.item.id, count: this.item.count});
  }

  onBtnRemoveClick(): void {
    this.remove.emit(this.item.id);
  }
}
