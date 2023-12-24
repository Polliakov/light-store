import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductInCatalog } from 'src/app/modules/customers/models/product-in-catalog';
import { CartService } from 'src/app/modules/customers/services/cart.service';
import { IProductItem } from 'src/app/modules/shared/models/product-item';

@Component({
  selector: 'app-poduct-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  constructor(private cartService: CartService) {}

  @Input() product: IProductInCatalog;
  @Output() showRemainsNeeded = new EventEmitter<IProductItem>();

  btnDisabled = false;

  get isAvailable(): boolean {
    return this.product.availabilityCount > 0;
  }

  showRemains() {
    this.showRemainsNeeded.emit(this.product);
  }

  onBtnCartAdd() {
    this.btnDisabled = true;
    this.cartService.addItem(this.product.id).subscribe(() =>
        this.product.inCart = true
      );
  }
}
