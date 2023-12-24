import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductsCategory } from '../../models/products-category';

@Component({
  selector: 'app-products-category-card',
  templateUrl: './products-category-card.component.html',
  styleUrls: ['./products-category-card.component.scss']
})
export class ProductsCategoryCardComponent {
  @Input() category: IProductsCategory;
  @Output() selected = new EventEmitter<IProductsCategory>();

  onClick() {
    this.selected.emit(this.category);
  }
}
