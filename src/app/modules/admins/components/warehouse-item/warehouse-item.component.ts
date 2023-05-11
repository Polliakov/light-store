import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWarehouse } from 'src/app/modules/shared/models/warehouse';

@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.scss']
})
export class WarehouseItemComponent {
  @Input() warehouse: IWarehouse;
  @Output() itemClick = new EventEmitter<string>();

  onClick() {
    this.itemClick.emit(this.warehouse.id);
  }
}
