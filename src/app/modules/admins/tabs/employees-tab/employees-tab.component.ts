import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { ModalAcceptComponent } from 'src/app/modules/shared/components/modal-accept/modal-accept.component';
import { IEmployee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-tab',
  templateUrl: './employees-tab.component.html',
  styleUrls: ['./employees-tab.component.scss']
})
export class EmployeesTabComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService
  ) {

  }

  @ViewChild('modalDelete') modalDelete: ModalAcceptComponent;
  employees: IEmployee[];
  employeeForDelete: IEmployee;
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.employeeService.getAll().pipe(
      tap(() => this.loading = false)
    ).subscribe(e => this.employees = e);
  }

  onEmployeeDelete(employee: IEmployee) {
    console.log(employee);
    this.employeeForDelete = employee;
    this.modalDelete.show();
  }

  onEmployeeSelected(employee: IEmployee) {

  }

  modalDeleteAccept() {
    this.employeeService.delete(this.employeeForDelete.appUserId).subscribe(() =>
      this.employees = this.employees.filter(e => e.appUserId != this.employeeForDelete.appUserId)
    );
  }
}
