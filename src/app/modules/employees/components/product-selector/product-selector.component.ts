import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { IProductItem } from '../../../shared/models/product-item';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit{
  constructor(
    private productService: ProductService,
    private scroller: ViewportScroller
  ) {

  }

  @Input() showPrice = true;
  @Output() selected = new EventEmitter<IProductItem>();

  products$: Observable<IProductItem[]>;
  foundCount$: Observable<number>;

  search?: string | null;
  currentPage = 1;
  pageSize = 24;

  loading = false;

  ngOnInit() {
    this.loadPage();
  }

  onItemClick(product: IProductItem) {
    this.selected.emit(product);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadPage();
  }

  onSearch(search: string) {
    this.search = search;
    this.currentPage = 1;
    this.loadPage();
  }

  onSearchReset() {
    if (this.search) {
      this.search = null;
      this.currentPage = 1;
      this.loadPage();
    }
  }

  private loadPage() {
    this.loading = true;
    this.scroller.scrollToPosition([0, 0]);

    this.products$ = this.productService.getItemsPage(
      { page: this.currentPage, pageSize: this.pageSize },
      { search: this.search }
    )
    .pipe(
      map(page => {
        this.foundCount$ = of(page.foundCount);
        return page.productItems;
      }),
      tap(() => {
        this.loading = false;
      })
    );
  }
}
