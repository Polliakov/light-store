import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  employees$: Observable<IEmployee[]>;
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.employees$ = this.employeeService.getAll().pipe(
      tap(() => this.loading = false)
    );
  }

  onEmployeeSelected(employee: IEmployee) {

  }
}
