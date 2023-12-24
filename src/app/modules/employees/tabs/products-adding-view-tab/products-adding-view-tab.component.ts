import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IProductsAddingDetails } from '../../models/products-adding-details';
import { ProductsAddingService } from '../../services/products-adding.service';

@Component({
  selector: 'app-products-adding-view-tab',
  templateUrl: './products-adding-view-tab.component.html',
  styleUrls: ['./products-adding-view-tab.component.scss']
})
export class ProductsAddingViewTabComponent implements OnInit {
  constructor(
    private addingService: ProductsAddingService,
    private route: ActivatedRoute
  ) {

  }

  loading = false;
  adding$: Observable<IProductsAddingDetails>;

  ngOnInit() {
    this.loading = true;
    let id = this.route.snapshot.paramMap.get('id')!;
    this.adding$ = this.addingService.getDetails(id).pipe(
      tap(() => this.loading = false)
    );
  }
}
