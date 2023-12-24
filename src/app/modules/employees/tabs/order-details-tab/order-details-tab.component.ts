import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { OrderStatus } from 'src/app/modules/shared/models/order-status';
import { IOrderDetails } from '../../models/order-details';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details-tab',
  templateUrl: './order-details-tab.component.html',
  styleUrls: ['./order-details-tab.component.scss']
})
export class OrderDetailsTabComponent {
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  orderId: string;
  order$: Observable<IOrderDetails>;

  orderStatuses = Object.values(OrderStatus)
      .filter(v => typeof v == 'number' && v != OrderStatus.cancelled) as OrderStatus[];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.orderId = this.route.snapshot.paramMap.get('id')!;

    this.order$ = this.orderService.getDetails(this.orderId)
      .pipe(
        tap((i) => { this.loading = false; })
      );
  }

  onStatusChange(event: any) {
    let status = +((event.target.value as string).split(': ')[1]);
    this.orderService.changeStatus({id: this.orderId, status}).subscribe();
  }
}
