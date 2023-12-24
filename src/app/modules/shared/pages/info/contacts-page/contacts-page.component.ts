import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IWarehouse } from '../../../models/warehouse';
import { WarehouseGetService } from '../../../services/warehouse-get.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent {
  constructor(private warehouseService: WarehouseGetService) {

  }

  warehouses$: Observable<IWarehouse[]>;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.warehouses$ = this.warehouseService.getAll().pipe(
      tap(() => this.loading = false)
    )
  }
}
