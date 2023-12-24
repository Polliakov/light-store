import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IOrder } from '../../../shared/models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss']
})
export class OrdersTabComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  orders$: Observable<IOrder[]>;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.orders$ = this.orderService.getCustomersOrders().pipe(
      tap(() => this.loading = false)
    );
  }

  toOrderDetails(orderId: string) {
    this.router.navigate(['../order', orderId], {relativeTo: this.route});
  }
}
