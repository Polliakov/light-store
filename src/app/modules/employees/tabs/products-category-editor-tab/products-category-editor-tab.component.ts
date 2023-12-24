import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAcceptComponent } from 'src/app/modules/shared/components/modal-accept/modal-accept.component';
import { ProductsCategorySelectorComponent } from 'src/app/modules/shared/components/products-category-selector/products-category-selector.component';
import { IProductsCategory } from 'src/app/modules/shared/models/products-category';
import { nonWhitespaceOrNull } from 'src/app/modules/shared/validators/non-wihitespace-or-null-validator';
import { ProductsCategoryService } from '../../services/products-category.service';

@Component({
  selector: 'app-products-category-editor-tab',
  templateUrl: './products-category-editor-tab.component.html',
  styleUrls: ['./products-category-editor-tab.component.scss']
})
export class ProductsCategoryEditorTabComponent implements OnInit{
  constructor(
    private categoryService: ProductsCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      nonWhitespaceOrNull()
    ]),
  })

  @ViewChild('modalDelete') modalDelete: ModalAcceptComponent;

  categoryTitle: string;
  image: File;
  categoryId: string | null;
  parentCategoryId: string | null;

  isEditMode = false;
  loading = false;
  isBtnSubmitDisabled = false;

// #region getters
  get name() {
    return this.form.controls.name;
  }
// #endregion

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')
    if (!this.categoryId) {
      this.parentCategoryId = this.route.snapshot.paramMap.get('parentCategoryId');
      return;
    }

    this.loading = true;
    this.isEditMode = true;
    this.categoryService.get(this.categoryId).subscribe({
      next: c => {
        this.name.setValue(c.name);
        this.categoryTitle = c.name;
        this.parentCategoryId = c.parentCategoryId!;
        this.loading = false;
      }
    });
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isBtnSubmitDisabled = true;

    let dto = this.form.value;
    dto.parentCategoryId = this.parentCategoryId;
    if (this.isEditMode) {
      dto.id = this.categoryId;
      this.categoryService.update(dto, this.image).subscribe({
        next: () => {
          this.router.navigate(['../../categories'], { relativeTo: this.route });
        }
      });
    }
    else {
      this.categoryService.create(dto, this.image).subscribe({
        next: () => {
          this.router.navigate(['../categories'], { relativeTo: this.route });
        }
      });
    }
  }

  onImageSelected(image: File) {
    if (!image) return;
    this.image = image;
  }

  onCategorySelected(parentCategory: IProductsCategory | null) {
    if (parentCategory?.id == this.categoryId)
      return;
    this.parentCategoryId = parentCategory?.id!;
  }

  onBtnDeleteClick() {
    this.modalDelete.show();
  }

  modalDeleteAccept() {
    this.isBtnSubmitDisabled = true;
    this.categoryService.delete(this.categoryId!).subscribe({
      next: () => this.router.navigate(['../../categories'], { relativeTo: this.route })
    });
  }
}
