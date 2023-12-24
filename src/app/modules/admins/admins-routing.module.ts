import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EmployeeEditorTabComponent } from './tabs/employee-editor-tab/employee-editor-tab.component';
import { EmployeesTabComponent } from './tabs/employees-tab/employees-tab.component';
import { WarehousesEditorTabComponent } from './tabs/warehouses-editor-tab/warehouses-editor-tab.component';
import { WarehousesTabComponent } from './tabs/warehouses-tab/warehouses-tab.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent, children: [
    { path: 'employees', title: 'Сотрудники', component: EmployeesTabComponent },
    { path: 'add-employee', title: 'Добавление сотрудника', component: EmployeeEditorTabComponent},

    { path: 'warehouses', title: 'Магазины', component: WarehousesTabComponent },
    { path: 'add-warehouse', title: 'Добавление магазина', component: WarehousesEditorTabComponent},
    { path: 'edit-warehouse/:id', title: 'Редактирование магазина', component: WarehousesEditorTabComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
