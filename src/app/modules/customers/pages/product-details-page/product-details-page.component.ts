import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CartService } from 'src/app/modules/customers/services/cart.service';
import { IProductDetails } from 'src/app/modules/shared/models/product-details';
import { IProductItem } from 'src/app/modules/shared/models/product-item';
import { ProductGetService } from 'src/app/modules/shared/services/product-get.service';
import { ModalProductRemainsComponent } from '../../components/modal-product-remains/modal-product-remains.component';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  constructor(
    private productService: ProductGetService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {

  }

  @ViewChild('modalProductRemains') modalRemains: ModalProductRemainsComponent;

  product$: Observable<IProductDetails>;
  productId: string;
  paramDefault = 'Не указано';
  loading = false;
  btnDisabled = false;
  inCart: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.btnDisabled = true;

    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.cartService.getItems().subscribe(items => {
      this.inCart = items.some(ci => ci.id == this.productId);
      this.btnDisabled = false;
    });

    this.product$ = this.productService.getDetails(this.productId).pipe(
      tap(() => this.loading = false)
    );
  }

  onShowRemainsNeeded(product: IProductDetails) {
    let productItem: IProductItem = {
      id: this.productId,
      ...product
    }
    this.modalRemains.show(productItem);
  }

  onBtnCartAdd(): void {
    this.btnDisabled = true;
    this.cartService.addItem(this.productId).subscribe(() =>
      this.inCart = true
    );
  }
}
