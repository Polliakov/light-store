import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { IOrder } from 'src/app/modules/shared/models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss']
})
export class OrdersTabComponent {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private scroller: ViewportScroller
  ) { }

  orders$: Observable<IOrder[]>;
  foundCount$: Observable<number>;

  currentPage = 1;
  pageSize = 24;

  loading = false;

  ngOnInit() {
    this.loadPage();
  }

  toOrderDetails(orderId: string) {
    this.router.navigate(['../order', orderId], {relativeTo: this.route});
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadPage();
  }

  private loadPage() {
    this.loading = true;
    this.scroller.scrollToPosition([0, 0]);

    this.orders$ = this.orderService.getPage(
      { page: this.currentPage, pageSize: this.pageSize }
    )
    .pipe(
      map(page => {
        this.foundCount$ = of(page.foundCount);
        return page.orders;
      }),
      tap(() => {
        this.loading = false;
      })
    );
  }
}
