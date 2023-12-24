import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductsCategory } from 'src/app/modules/shared/models/products-category';

@Component({
  selector: 'app-products-categories-tab',
  templateUrl: './products-categories-tab.component.html',
  styleUrls: ['./products-categories-tab.component.scss']
})
export class ProductsCategoriesTabComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  selectedCategory: IProductsCategory | null;

  get isEditBtnDissabled() {
    return !this.selectedCategory;
  }

  onCategorySelected(category: IProductsCategory | null) {
    this.selectedCategory = category;
  }

  editCategory() {
    this.router.navigate(['../edit-category', this.selectedCategory?.id], { relativeTo: this.route });
  }

  addCategory() {
    let path: any = ['../add-category'];
    if (this.selectedCategory?.id)
      path.push({ parentCategoryId: this.selectedCategory?.id })

    this.router.navigate(path, { relativeTo: this.route });
  }
}
