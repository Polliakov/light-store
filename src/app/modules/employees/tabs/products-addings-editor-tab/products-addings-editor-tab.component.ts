import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IWarehouseMinified } from 'src/app/modules/shared/models/warehouse-minified';
import { WarehouseGetService } from 'src/app/modules/shared/services/warehouse-get.service';
import { ICreateProductsAddingDto } from '../../models/dtos/create-products-adding-dto';
import { IProductInAddingDto } from '../../models/dtos/product-in-adding-dto';
import { IProductInAdding } from '../../models/product-in-adding';
import { IProductItem } from '../../../shared/models/product-item';
import { ProductsAddingService } from '../../services/products-adding.service';

@Component({
  selector: 'app-products-addings-editor-tab',
  templateUrl: './products-addings-editor-tab.component.html',
  styleUrls: ['./products-addings-editor-tab.component.scss']
})
export class ProductsAddingsEditorTabComponent implements OnInit {
  constructor(
    private addingService: ProductsAddingService,
    private warehouseService: WarehouseGetService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  form: FormGroup = new FormGroup({
    warehouseId: new FormControl<string>(null!, [
      Validators.required
    ])
  });

  warehouses$: Observable<IWarehouseMinified[]>
  products: IProductInAdding[] = []

  loading = false;
  private _isBtnSubmitDisabled = false;

  get isBtnSubmitDisabled() {
    return this._isBtnSubmitDisabled || this.products.length == 0;
  }

  // #region getters
  get warehouseId() {
    return this.form.controls.warehouseId;
  }
  // #endregion

  ngOnInit() {
    this.warehouses$ = this.warehouseService.getAllMinified()
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this._isBtnSubmitDisabled = true;

    let productDtos: IProductInAddingDto[] = this.products.map(p => ({
      productId: p.productId,
      count: p.count
    }))

    let dto: ICreateProductsAddingDto = {
      warehouseId: this.warehouseId.value,
      productsInAdding: productDtos
    }

    this.addingService.create(dto).subscribe({
      next: () => this.router.navigate(['../products-addings'], { relativeTo: this.route })
    })
  }

  onProductSelected(productItem: IProductItem) {
    if (this.products.some(p => p.productId == productItem.id))
      return;

    let product: IProductInAdding = {
      productId: productItem.id,
      title: productItem.title,
      imageUri: productItem.imageUri,
      count: 1
    }
    this.products.push(product);
  }

  onProductRemove(id: string) {
    this.products.splice(this.products.findIndex(p => p.productId == id), 1);
  }
}
