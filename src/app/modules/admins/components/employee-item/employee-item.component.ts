import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee } from '../../models/employee';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss']
})
export class EmployeeItemComponent {
  @Input() employee: IEmployee;
  @Output() selected = new EventEmitter<IEmployee>();
  @Output() deleteClick = new EventEmitter<IEmployee>();

  onClick() {
    this.selected.emit(this.employee);
  }

  onDeleteButtonClick() {
    this.deleteClick.emit(this.employee);
  }
}
