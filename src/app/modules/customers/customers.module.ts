import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { CustomerBaseLayoutComponent } from './pages/customer-base-layout/customer-base-layout.component';
import { PersonalTabComponent } from './tabs/personal-tab/personal-tab.component';
import { OrderCreatingPageComponent } from './pages/order-creating-page/order-creating-page.component';
import { CreateOrderItemComponent } from './components/create-order-item/create-order-item.component';
import { ModalProductRemainsComponent } from './components/modal-product-remains/modal-product-remains.component';
import { ProductAvailabilityComponent } from './components/product-availability/product-availability.component';
import { ModalPleaseSignupComponent } from './components/modal-please-signup/modal-please-signup.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrdersTabComponent } from './tabs/orders-tab/orders-tab.component';
import { OrderDetailsTabComponent } from './tabs/order-details-tab/order-details-tab.component';
import { OrderItemComponent } from './components/order-item/order-item.component';


@NgModule({
  declarations: [
    PersonalTabComponent,
    RegistrationPageComponent,
    CustomerPageComponent,
    CartPageComponent,
    ProductCardComponent,
    ProductsPageComponent,
    ProductDetailsPageComponent,
    CartItemComponent,
    CustomerBaseLayoutComponent,
    OrderCreatingPageComponent,
    CreateOrderItemComponent,
    ModalProductRemainsComponent,
    ProductAvailabilityComponent,
    ModalPleaseSignupComponent,
    OrderCardComponent,
    OrdersTabComponent,
    OrderDetailsTabComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomersModule { }
