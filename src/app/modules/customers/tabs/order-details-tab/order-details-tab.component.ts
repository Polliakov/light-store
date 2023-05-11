import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IOrderItem } from 'src/app/modules/shared/models/order-item';
import { IOrderDetails } from '../../models/order-details';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details-tab',
  templateUrl: './order-details-tab.component.html',
  styleUrls: ['./order-details-tab.component.scss']
})
export class OrderDetailsTabComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  orderId: string;
  order$: Observable<IOrderDetails>;

  loading = false;

  ngOnInit() {
    this.loading = true;
    this.orderId = this.route.snapshot.paramMap.get('id')!;

    this.order$ = this.orderService.getCustomersOrderDetails(this.orderId)
      .pipe(
        tap((i) => { this.loading = false; console.log(i)})
      );
  }

  calculateTotal(items: IOrderItem[]) {
    return items.reduce((acc, i) => acc + i.price * i.count, 0);
  }
}
