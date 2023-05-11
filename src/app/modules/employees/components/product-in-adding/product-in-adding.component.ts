import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductInAdding } from '../../models/product-in-adding';

@Component({
  selector: 'app-product-in-adding',
  templateUrl: './product-in-adding.component.html',
  styleUrls: ['./product-in-adding.component.scss']
})
export class ProductInAddingComponent {
  @Input() product: IProductInAdding;
  @Input() readonly = false;
  @Output() countChange = new EventEmitter<IProductInAdding>();
  @Output() remove = new EventEmitter<string>();

  onCountChange() {
    if (this.product.count < 1) {
      this.remove.emit(this.product.productId);
      return;
    }
    this.countChange.emit(this.product);
  }

  onBtnRemoveClick() {
    this.remove.emit(this.product.productId);
  }
}
