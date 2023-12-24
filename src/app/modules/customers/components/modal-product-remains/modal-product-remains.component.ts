import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProductInWarehouse } from 'src/app/modules/shared/models/product-in-warehouse';
import { IProductItem } from 'src/app/modules/shared/models/product-item';
import { ProductInWarehouseService } from 'src/app/modules/shared/services/product-in-warehouse.service';

@Component({
  selector: 'app-modal-product-remains',
  templateUrl: './modal-product-remains.component.html',
  styleUrls: ['./modal-product-remains.component.scss']
})
export class ModalProductRemainsComponent {
  constructor(
    private productInWarehouseService: ProductInWarehouseService
  ) {

  }

  remains$: Observable<IProductInWarehouse[]> | null;
  product: IProductItem;

  visible = false;
  loading = false;

  show(product: IProductItem) {
    this.loading = true;
    this.visible = true;

    this.product = product;
    this.remains$ = this.productInWarehouseService.getProductRemains(product.id)
      .pipe(
        tap(() => this.loading = false)
      );
  }

  hide() {
    this.visible = false;
    this.remains$ = null;
  }
}
