import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IProductItem } from '../../../shared/models/product-item';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent {
  constructor(
    private productService: ProductService
  ) {

  }

  @Input() showPrice = true;
  @Output() selected = new EventEmitter<IProductItem>();

  products$: Observable<IProductItem[]>;
  foundCount: number;
  page = 1;
  pageSize = 12;

  loading = false;

  ngOnInit() {
    this.loading = true;
    this.products$ = this.productService.getItemsPage({page: 1, pageSize: 12}).pipe(
      map(page => {
        this.foundCount = page.foundCount;
        return page.productItems;
      }),
      tap(() => {
        this.loading = false;
      })
    );
  }

  onItemClick(product: IProductItem) {
    this.selected.emit(product);
  }
}
