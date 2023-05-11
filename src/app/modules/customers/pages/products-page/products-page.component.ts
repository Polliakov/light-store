import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IProductInCatalog } from 'src/app/modules/customers/models/product-in-catalog';
import { CartService } from 'src/app/modules/customers/services/cart.service';
import { ProductsCategorySelectorComponent } from 'src/app/modules/shared/components/products-category-selector/products-category-selector.component';
import { IProduct } from 'src/app/modules/shared/models/product';
import { IProductItem } from 'src/app/modules/shared/models/product-item';
import { IProductsCategory } from 'src/app/modules/shared/models/products-category';
import { ProductGetService } from 'src/app/modules/shared/services/product-get.service';
import { ModalProductRemainsComponent } from '../../components/modal-product-remains/modal-product-remains.component';
import { ICartItem } from '../../models/cart-item';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private productService: ProductGetService,
    private cartService: CartService,
    private scroller: ViewportScroller
  ) {
    this.loadPage();
  }

  @ViewChild('modalProductRemains') modalRemains: ModalProductRemainsComponent;
  @ViewChild('categorySelector') categorySelector: ProductsCategorySelectorComponent;

  products$: Observable<IProductInCatalog[]>;
  foundCount$: Observable<number>;

  search?: string | null;
  category?: IProductsCategory | null;
  currentPage = 1;
  pageSize = 24;
  loading = false;

  ngOnInit() {
   // this.loadPage();
  }

  onCategorySelected(category?: IProductsCategory | null) {
    this.category = category;
    this.currentPage = 1;
    this.loadPage();
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadPage();
  }

  onSearch(search: string) {
    this.search = search;
    this.currentPage = 1;
    this.resetCategory();
    this.loadPage();
  }

  onSearchReset() {
    if (this.search) {
      this.search = null;
      this.currentPage = 1;
      this.loadPage();
    }
  }

  onShowRemainsNeeded(product: IProductItem) {
    this.modalRemains.show(product);
  }

  private resetCategory() {
    this.category = null;
    this.categorySelector.reset();
  }

  private loadPage() {
    this.loading = true;
    this.scroller.scrollToPosition([0, 0]);

    this.cartService.getItems().subscribe(cartItems => {
      this.products$ = this.productService.getPage(
        { page: this.currentPage, pageSize: this.pageSize },
        { search: this.search, categoryId: this.category?.id }
      )
        .pipe(
          map(page => {
            this.foundCount$ = of(page.foundCount);
            return this.markInCart(page.products, cartItems);
          }),
          tap(() => {
            this.loading = false;
          })
        );
    });
  }

  private markInCart(products: IProduct[], cartItems: ICartItem[]) : IProductInCatalog[] {
    return products.map(p => {
      (p as any).inCart = cartItems.some(ci => ci.id == p.id);
      return p as IProductInCatalog;
    })
  }
}
