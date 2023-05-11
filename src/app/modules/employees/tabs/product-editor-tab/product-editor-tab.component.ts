import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAcceptComponent } from 'src/app/modules/shared/components/modal-accept/modal-accept.component';
import { IProductsCategory } from 'src/app/modules/shared/models/products-category';
import { parseNumber } from 'src/app/modules/shared/utils/parse-utils';
import { nonWhitespace } from 'src/app/modules/shared/validators/non-whitespace-validator';
import { nonWhitespaceOrNull } from 'src/app/modules/shared/validators/non-wihitespace-or-null-validator';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-editor-tab',
  templateUrl: './product-editor-tab.component.html',
  styleUrls: ['./product-editor-tab.component.scss']
})
export class ProductEditorTabComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      nonWhitespaceOrNull(),
      Validators.minLength(2),
      Validators.maxLength(128)
    ]),
    price: new FormControl<string>(null!, [
      Validators.required
    ]),
    unitOfMeasure: new FormControl<number>(0),
    size: new FormControl<string | null>(null, [
      nonWhitespace(),
      Validators.maxLength(64)
    ]),
    weight: new FormControl<string | null>(null),
    description: new FormControl<string | null>(''),
  });

  @ViewChild('modalDelete') modalDelete: ModalAcceptComponent;

  productId: string;
  productTitle: string;
  image: File;
  categoryId: string | null;

  isEditMode = false;
  loading = false;
  isBtnSubmitDisabled = false;

// #region getters
  get title() {
    return this.form.controls.title;
  }
  get price() {
    return this.form.controls.price;
  }
  get unitOfMeasure() {
    return this.form.controls.unitOfMeasure;
  }
  get size() {
    return this.form.controls.size;
  }
  get weight() {
    return this.form.controls.weight;
  }
  get description() {
    return this.form.controls.description;
  }
// #endregion

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id')
    if (!productId) return;

    this.loading = true;
    this.isEditMode = true;
    this.productId = productId;
    this.productService.getDetails(productId).subscribe({
      next: dto => {
        let {imageUri, categoryId, ...product} = dto;

        this.form.setValue(product);
        this.categoryId = categoryId;
        this.productTitle = product.title;
        this.loading = false;
      }
    })
  }

  onImageSelected(image: File) {
    if (!image) return;
    this.image = image;
  }

  onCategorySelected(category: IProductsCategory | null) {
    this.categoryId = category?.id!;
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isBtnSubmitDisabled = true;

    let dto = this.form.value;
    dto.price = parseNumber(dto.price);
    dto.weight = parseNumber(dto.weight);
    this.whiteSpaceToNull(dto);
    dto.categoryId = this.categoryId;

    if (this.isEditMode) {
      dto.id = this.productId;
      this.productService.update(dto, this.image).subscribe({
        next: () => this.router.navigate(['../../products'], { relativeTo: this.route })
      });
    }
    else {
      this.productService.create(dto, this.image).subscribe({
        next: () => this.router.navigate(['../products'], { relativeTo: this.route })
      });
    }
  }

  onBtnDeleteClick() {
    this.modalDelete.show();
  }

  modalDeleteAccept() {
    this.isBtnSubmitDisabled = true;
    this.productService.delete(this.productId).subscribe({
      next: () => this.router.navigate(['../../products'], { relativeTo: this.route })
    });
  }

  private whiteSpaceToNull(dto: any) {
    if (!dto.size?.trim())
      dto.size = null;
    if (!dto.description?.trim())
      dto.description = null;
  }

  createManyTimes(times: number) { // TODO: Remove one prod.
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isBtnSubmitDisabled = true;

    let dto = this.form.value;
    dto.price = parseFloat(dto.price?.replace(',', '.'));
    dto.weight = parseFloat(dto.weight?.replace(',', '.'));
    this.whiteSpaceToNull(dto);
    dto.categoryId = this.categoryId;

    let tmpName = dto.title;
    for (let i = 1; i <= times; i++) {
      dto.title = `${tmpName} ${i}`;
      this.productService.create(dto, this.image).subscribe();
    }
    this.router.navigate(['../products'], { relativeTo: this.route })
  }
}
