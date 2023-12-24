import { Component, Input } from '@angular/core';
import { IWarehouse } from '../../models/warehouse';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {
  @Input() warehouse: IWarehouse;
}
