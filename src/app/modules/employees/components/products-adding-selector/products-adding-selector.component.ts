import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProductsAdding } from '../../models/products-adding';
import { ProductsAddingService } from '../../services/products-adding.service';

@Component({
  selector: 'app-products-adding-selector',
  templateUrl: './products-adding-selector.component.html',
  styleUrls: ['./products-adding-selector.component.scss']
})
export class ProductsAddingSelectorComponent implements OnInit {
  constructor(
    private addingService: ProductsAddingService
  ) {

  }
  @Output() addingSelected = new EventEmitter<IProductsAdding>();

  addings$: Observable<IProductsAdding[]>;
  loading = false;

  ngOnInit(): void {
    this.loading = true;

    this.addings$ = this.addingService.getAll().pipe(
      tap(() => this.loading = false)
    );
  }

  onItemSelected(adding: IProductsAdding) {
    this.addingSelected.emit(adding);
  }
}
