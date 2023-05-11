import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { CustomerGuard } from './modules/customers/guards/customer.guard';
import { GuestGuard } from './modules/shared/guards/guest.guard';
import { AuthPageComponent } from './modules/shared/pages/auth-page/auth-page.component';
import { ContactsPageComponent } from './modules/shared/pages/info/contacts-page/contacts-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { TemplateTitleStrategy } from './template-title-strategy';
import { ExchangeRefundPageComponent } from './modules/shared/pages/info/exchange-refund-page/exchange-refund-page.component';
import { PrivacyPolicyPageComponent } from './modules/shared/pages/info/privacy-policy-page/privacy-policy-page.component';
import { AgreementPageComponent } from './modules/shared/pages/info/agreement-page/agreement-page.component';
import { WarrantyPageComponent } from './modules/shared/pages/info/warranty-page/warranty-page.component';
import { AdminGuard } from './modules/admins/guards/admin.guard';
import { EmployeeGuard } from './modules/employees/guards/employee.guard';
import { BaseLayoutComponent } from './modules/shared/pages/base-layout/base-layout.component';

const routes: Routes = [
  { path: 'employee', loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule),
  canActivate: [EmployeeGuard]
  },
  { path: 'admin', loadChildren: () => import('./modules/admins/admins.module').then(m => m.AdminsModule),
  canActivate: [AdminGuard]
  },

  { path: '', component: BaseLayoutComponent, children: [
    { path: 'authentication', title: 'Вход', component: AuthPageComponent, canActivate: [GuestGuard] },

    { path: 'contacts', title: 'Контакты', component: ContactsPageComponent },
    { path: 'exchange-refund', title: 'Обмен и возврат', component: ExchangeRefundPageComponent },
    { path: 'privacy-policy', title: 'Политика конфиденциальности', component: PrivacyPolicyPageComponent },
    { path: 'agreement', title: 'Пользовательское соглашение', component: AgreementPageComponent },
    { path: 'warranty', title: 'Гарантия', component: WarrantyPageComponent },
  ]},
  { path: '', loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule)},

  { path: '**', title: 'Страница не найдена', component: NotfoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: TemplateTitleStrategy}
  ]
})
export class AppRoutingModule { }
