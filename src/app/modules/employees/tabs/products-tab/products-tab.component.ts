import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductItem } from '../../../shared/models/product-item';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.scss']
})
export class ProductsTabComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  onProductSelected(product: IProductItem) {
    this.router.navigate(['../edit-product', product.id], {relativeTo: this.activatedRoute});
  }
}
