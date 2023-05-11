import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductsAdding } from '../../models/products-adding';

@Component({
  selector: 'app-products-adding-item',
  templateUrl: './products-adding-item.component.html',
  styleUrls: ['./products-adding-item.component.scss']
})
export class ProductsAddingItemComponent {
  @Input() adding: IProductsAdding;
  @Output() selected = new EventEmitter<IProductsAdding>();

  onClick() {
    this.selected.emit(this.adding);
  }
}
