import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmployeesTabComponent } from './tabs/employees-tab/employees-tab.component';
import { EmployeeEditorTabComponent } from './tabs/employee-editor-tab/employee-editor-tab.component';
import { WarehousesTabComponent } from './tabs/warehouses-tab/warehouses-tab.component';
import { WarehousesEditorTabComponent } from './tabs/warehouses-editor-tab/warehouses-editor-tab.component';
import { WarehouseItemComponent } from './components/warehouse-item/warehouse-item.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { EmployeeItemComponent } from './components/employee-item/employee-item.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    EmployeesTabComponent,
    EmployeeEditorTabComponent,
    WarehousesTabComponent,
    WarehousesEditorTabComponent,
    WarehouseItemComponent,
    AdminHeaderComponent,
    EmployeeItemComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminsModule { }
