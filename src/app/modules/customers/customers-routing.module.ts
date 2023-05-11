import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../shared/guards/guest.guard';
import { CustomerGuard } from './guards/customer.guard';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CustomerBaseLayoutComponent } from './pages/customer-base-layout/customer-base-layout.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { OrderCreatingPageComponent } from './pages/order-creating-page/order-creating-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { OrderDetailsTabComponent } from './tabs/order-details-tab/order-details-tab.component';
import { OrdersTabComponent } from './tabs/orders-tab/orders-tab.component';
import { PersonalTabComponent } from './tabs/personal-tab/personal-tab.component';

const routes: Routes = [
  { path: '', component: CustomerBaseLayoutComponent, children: [
    { path: 'registration', title: 'Регистрация', component: RegistrationPageComponent, canActivate: [GuestGuard] },

    { path: 'profile', title: 'Профиль', component: CustomerPageComponent, canActivate: [CustomerGuard], children: [
      { path: 'orders', title: 'Заказы', component: OrdersTabComponent },
      { path: 'order/:id', title: 'Заказ', component: OrderDetailsTabComponent },
      { path: 'personal', title: 'Учётная запись', component: PersonalTabComponent }
    ]},

    { path: 'cart', title: 'Корзина', component: CartPageComponent },
    { path: 'order-creating', title: 'Оформление заказа', component: OrderCreatingPageComponent, canActivate: [CustomerGuard] },
    { path: 'products', title: 'Товары', component: ProductsPageComponent },
    { path: 'products/:id', title: 'Товар', component: ProductDetailsPageComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
