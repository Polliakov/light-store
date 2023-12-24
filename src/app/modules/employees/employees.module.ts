import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ProductEditorTabComponent } from './tabs/product-editor-tab/product-editor-tab.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { ProductsTabComponent } from './tabs/products-tab/products-tab.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { ProductsCategoriesTabComponent } from './tabs/products-categories-tab/products-categories-tab.component';
import { ProductsCategoryEditorTabComponent } from './tabs/products-category-editor-tab/products-category-editor-tab.component';
import { OrdersTabComponent } from './tabs/orders-tab/orders-tab.component';
import { ProductsAddingsTabComponent } from './tabs/products-addings-tab/products-addings-tab.component';
import { ProductsAddingsEditorTabComponent } from './tabs/products-addings-editor-tab/products-addings-editor-tab.component';
import { ProductInAddingComponent } from './components/product-in-adding/product-in-adding.component';
import { ProductsAddingItemComponent } from './components/products-adding-item/products-adding-item.component';
import { ProductsAddingSelectorComponent } from './components/products-adding-selector/products-adding-selector.component';
import { ProductsAddingViewTabComponent } from './tabs/products-adding-view-tab/products-adding-view-tab.component';
import { EmployeeBaseLayoutComponent } from './pages/employee-base-layout/employee-base-layout.component';
import { EmployeeHeaderComponent } from './components/employee-header/employee-header.component';
import { OrderDetailsTabComponent } from './tabs/order-details-tab/order-details-tab.component';


@NgModule({
  declarations: [
    ProductEditorTabComponent,
    EmployeePageComponent,
    ProductsTabComponent,
    ProductItemComponent,
    ProductSelectorComponent,
    ProductsCategoriesTabComponent,
    ProductsCategoryEditorTabComponent,
    OrdersTabComponent,
    ProductsAddingsTabComponent,
    ProductsAddingsEditorTabComponent,
    ProductInAddingComponent,
    ProductsAddingItemComponent,
    ProductsAddingSelectorComponent,
    ProductsAddingViewTabComponent,
    EmployeeBaseLayoutComponent,
    EmployeeHeaderComponent,
    OrderDetailsTabComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmployeesModule { }
