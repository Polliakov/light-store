import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { OrderDetailsTabComponent } from './tabs/order-details-tab/order-details-tab.component';
import { OrdersTabComponent } from './tabs/orders-tab/orders-tab.component';
import { ProductEditorTabComponent } from './tabs/product-editor-tab/product-editor-tab.component';
import { ProductsAddingViewTabComponent } from './tabs/products-adding-view-tab/products-adding-view-tab.component';
import { ProductsAddingsEditorTabComponent } from './tabs/products-addings-editor-tab/products-addings-editor-tab.component';
import { ProductsAddingsTabComponent } from './tabs/products-addings-tab/products-addings-tab.component';
import { ProductsCategoriesTabComponent } from './tabs/products-categories-tab/products-categories-tab.component';
import { ProductsCategoryEditorTabComponent } from './tabs/products-category-editor-tab/products-category-editor-tab.component';
import { ProductsTabComponent } from './tabs/products-tab/products-tab.component';

const routes: Routes = [
  { path: '', component: EmployeePageComponent, children: [
    { path: 'products', title: 'Товары', component: ProductsTabComponent },
    { path: 'add-product', title: 'Добавление товара', component: ProductEditorTabComponent },
    { path: 'edit-product/:id', title: 'Редактирование товара', component: ProductEditorTabComponent },

    { path: 'categories', title: 'Категории', component: ProductsCategoriesTabComponent},
    { path: 'add-category', title: 'Добавление категории', component: ProductsCategoryEditorTabComponent },
    { path: 'edit-category/:id', title: 'Редактирование категории', component: ProductsCategoryEditorTabComponent },

    { path: 'orders', title: 'Заказы', component: OrdersTabComponent},
    { path: 'order/:id', title: 'Заказ', component: OrderDetailsTabComponent},

    { path: 'products-addings', title: 'Поставки', component: ProductsAddingsTabComponent},
    { path: 'products-adding/:id', title: 'Поставкa', component: ProductsAddingViewTabComponent},
    { path: 'add-products-adding', title: 'Регистрация поставки', component: ProductsAddingsEditorTabComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
