import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductsAdding } from '../../models/products-adding';

@Component({
  selector: 'app-products-addings-tab',
  templateUrl: './products-addings-tab.component.html',
  styleUrls: ['./products-addings-tab.component.scss']
})
export class ProductsAddingsTabComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  onAddingSelected(adding: IProductsAdding) {
    this.router.navigate(['../products-adding', adding.id], { relativeTo: this.route });
  }
}
