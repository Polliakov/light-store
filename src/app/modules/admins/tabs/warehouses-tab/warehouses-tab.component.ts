import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IWarehouse } from 'src/app/modules/shared/models/warehouse';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouses-tab',
  templateUrl: './warehouses-tab.component.html',
  styleUrls: ['./warehouses-tab.component.scss']
})
export class WarehousesTabComponent implements OnInit{
  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  warehouses$: Observable<IWarehouse[]>;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.warehouses$ = this.warehouseService.getAll().pipe(
      tap(() => this.loading = false)
    )
  }

  addWarehouse() {
    this.router.navigate(['../add-warehouse'], { relativeTo: this.route });
  }

  editWarehouse(id: string) {
    this.router.navigate(['../edit-warehouse', id], { relativeTo: this.route });
  }
}
