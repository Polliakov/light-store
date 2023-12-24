import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PricePipe } from './pipes/price.pipe';
import { UnitOfMeasurePipe } from './pipes/unit-of-measure.pipe';
import { ExchangeRefundPageComponent } from './pages/info/exchange-refund-page/exchange-refund-page.component';
import { PrivacyPolicyPageComponent } from './pages/info/privacy-policy-page/privacy-policy-page.component';
import { WarrantyPageComponent } from './pages/info/warranty-page/warranty-page.component';
import { ContactsPageComponent } from './pages/info/contacts-page/contacts-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSectionComponent } from './components/form-section/form-section.component';
import { ModalComponent } from './components/modal/modal.component';
import { ProductsCategorySelectorComponent } from './components/products-category-selector/products-category-selector.component';
import { ProductsCategoryCardComponent } from './components/products-category-card/products-category-card.component';
import { ModalAcceptComponent } from './components/modal-accept/modal-accept.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { DropdownLabelComponent } from './components/dropdown-label/dropdown-label.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { PersonFullNamePipe } from './pipes/person-full-name.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { HeaderComponent } from './components/header/header.component';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { UserRolePipe } from './pipes/user-role.pipe';
import { PaginationControlComponent } from './components/pagination-control/pagination-control.component';
import { SearchComponent } from './components/search/search.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeclByNumPipe } from './pipes/decl-by-num.pipe';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderItemsListComponent } from './components/order-items-list/order-items-list.component';
import { RecivingPlaceComponent } from './components/reciving-place/reciving-place.component';
import { OrderItemsSummaryComponent } from './components/order-items-summary/order-items-summary.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    PricePipe,
    UnitOfMeasurePipe,
    PrivacyPolicyPageComponent,
    WarrantyPageComponent,
    ExchangeRefundPageComponent,
    ContactsPageComponent,
    AuthPageComponent,
    FormErrorComponent,
    FormSectionComponent,
    NotificationComponent,
    NotificationContainerComponent,
    OnlyNumberDirective,
    FooterComponent,
    ModalComponent,
    ProductsCategorySelectorComponent,
    ProductsCategoryCardComponent,
    ModalAcceptComponent,
    ImageSelectorComponent,
    DropdownLabelComponent,
    PhoneNumberPipe,
    PhoneMaskDirective,
    PersonFullNamePipe,
    LocalDatePipe,
    BaseLayoutComponent,
    UserRolePipe,
    PaginationControlComponent,
    SearchComponent,
    ChangePasswordComponent,
    DeclByNumPipe,
    OrderStatusPipe,
    OrderCardComponent,
    OrderItemComponent,
    OrderItemsListComponent,
    RecivingPlaceComponent,
    OrderItemsSummaryComponent,
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    PricePipe,
    UnitOfMeasurePipe,
    PrivacyPolicyPageComponent,
    WarrantyPageComponent,
    ExchangeRefundPageComponent,
    ContactsPageComponent,
    AuthPageComponent,
    FormErrorComponent,
    NotificationComponent,
    NotificationContainerComponent,
    OnlyNumberDirective,
    FooterComponent,
    ModalComponent,
    ProductsCategorySelectorComponent,
    ModalAcceptComponent,
    ImageSelectorComponent,
    DropdownLabelComponent,
    PhoneNumberPipe,
    PhoneMaskDirective,
    PersonFullNamePipe,
    LocalDatePipe,
    UserRolePipe,
    PaginationControlComponent,
    SearchComponent,
    ChangePasswordComponent,
    DeclByNumPipe,
    OrderStatusPipe,
    OrderCardComponent,
    OrderItemComponent,
    OrderItemsListComponent,
    RecivingPlaceComponent,
    OrderItemsSummaryComponent
  ]
})
export class SharedModule { }
