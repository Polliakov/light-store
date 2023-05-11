import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductItem } from '../../../shared/models/product-item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: IProductItem;
  @Input() showPrice = true;
  @Output() itemClick = new EventEmitter<IProductItem>();

  onClick() {
    this.itemClick.emit(this.product);
  }
}
