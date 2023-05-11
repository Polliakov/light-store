import { Component, EventEmitter, Input, OnInit, Output, Predicate } from '@angular/core';
import { IProductsCategory } from '../../models/products-category';
import { ProductsCategoryService } from '../../services/products-category.service';

@Component({
  selector: 'app-products-category-selector',
  templateUrl: './products-category-selector.component.html',
  styleUrls: ['./products-category-selector.component.scss']
})
export class ProductsCategorySelectorComponent implements OnInit{
  constructor(
    private categoryService: ProductsCategoryService
  ) {

  }

  @Input() preselectedId: string | null;
  @Output() selected = new EventEmitter<IProductsCategory | null>();

  loading = false;

  rootCategories: IProductsCategory[];
  shownCategories: IProductsCategory[];
  selectedCategory?: IProductsCategory | null;

  ngOnInit() {
    this.loading = true;

    this.categoryService.getAll().subscribe({
      next: cs => {
        this.rootCategories = cs;
        let showRoot = true;

        if (this.preselectedId) {
          showRoot = !this.setSelectedCategory(this.preselectedId)
        }
        if (showRoot) {
          this.shownCategories = this.rootCategories;
        }
        this.loading = false;
      }
    });
  }

  reset(emitSelectedEvent = false) {
    this.shownCategories = this.rootCategories;
    this.selectedCategory = null;

    if (emitSelectedEvent)
      this.selected.emit(this.selectedCategory);
  }

  onCategorySelected(selected: IProductsCategory) {
    this.selectedCategory = selected;
    this.shownCategories = selected.childСategories;

    this.selected.emit(this.selectedCategory);
  }

  toPreviousCategory() {
    this.selectedCategory = this.selectedCategory?.parentCategory;

    if (this.selectedCategory) {
      this.shownCategories = this.selectedCategory.childСategories;
    }
    else {
      this.shownCategories = this.rootCategories;
    }
    this.selected.emit(this.selectedCategory);
  }

  setSelectedCategory(id: string): boolean {
    let category = this.findById(id);
    if (!category) return false;

    this.selectedCategory = category;
    this.shownCategories = category.childСategories;

    this.selected.emit(this.selectedCategory);
    return true;
  }

  private findById(id: string): IProductsCategory | null {
    for (let category of this.rootCategories) {
      let result = this.findRecursive(category, c => c.id == id);
      if (result) return result;
    }
    return null;
  }

  private findRecursive(
    category: IProductsCategory,
    predicate: Predicate<IProductsCategory>
    ): IProductsCategory | null {
      if (predicate(category))
        return category;
      if (!category.childСategories)
        return null;

      for (let child of category.childСategories) {
        let result = this.findRecursive(child, predicate);
        if (result) return result;
      }
      return null;
    }
}
