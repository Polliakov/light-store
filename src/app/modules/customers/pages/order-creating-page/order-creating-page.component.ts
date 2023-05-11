import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { IProductRemainsMinified } from 'src/app/modules/shared/models/product-remains-minified';
import { IWarehouseMinified } from 'src/app/modules/shared/models/warehouse-minified';
import { ProductInWarehouseService } from 'src/app/modules/shared/services/product-in-warehouse.service';
import { WarehouseGetService } from 'src/app/modules/shared/services/warehouse-get.service';
import { ICartItem } from '../../models/cart-item';
import { ICreateOrderDto } from '../../models/dtos/create-order-dto';
import { IProductInOrderDto } from '../../models/dtos/product-in-order-dto';
import { ICreateOrderItem } from '../../models/create-order-item';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-creating-page',
  templateUrl: './order-creating-page.component.html',
  styleUrls: ['./order-creating-page.component.scss']
})
export class OrderCreatingPageComponent implements OnInit {
  constructor (
    private orderService: OrderService,
    private warehouseService: WarehouseGetService,
    private productInWarehouseService: ProductInWarehouseService,
    private cartService: CartService,
    private router: Router
  ) {

  }

  items: ICreateOrderItem[] = [];
  warehouses: IWarehouseMinified[];
  recivingWarehouseId: string | null = null;

  total = 0;
  loading = false;

  get itemsToOrderCount(): number {
    return this.getItemsToOrder().length;
  }

  get isBtnSubmitDisabled(): boolean {
    return this.loading || this.itemsToOrderCount == 0;
  }

  ngOnInit() {
    this.loading = true;
    combineLatest({
      orderItems: this.getOrderItems(),
      warehouses: this.warehouseService.getAllMinified()
    }).subscribe({
      next: result => {
        this.warehouses = result.warehouses;
        this.items = result.orderItems;
        this.recalculateTotal();
        this.loading = false;
      }
    })
  }

  submitOrder() {
    this.loading = true;
    let createOrderDto: ICreateOrderDto = {
      warehouseId: this.recivingWarehouseId!,
      deliveryInformation: null,
      productsInOrder: this.ProjectToDtos(this.getItemsToOrder())
    }
    this.orderService.create(createOrderDto)
      .subscribe(() => this.router.navigate(['/profile/orders']));
  }

  onSelectionChange() {
    this.recalculateTotal();
  }

  onCountChange() {
    this.recalculateAvailability();
    this.recalculateTotal();
  }

  onWarehouseSelected(event: any) {
    this.recivingWarehouseId = event.target.value;
    this.recalculateAvailability();
    this.recalculateTotal();
  }

  onCbSelectAllChanged(event: any) {
    let checked = event.target.checked;
    for (let item of this.items)
      item.selected = checked;
  }

  private getOrderItems(): Observable<ICreateOrderItem[]>
  {
    return this.cartService.getItems().pipe(
      switchMap(cartItems => {
        let productIds = cartItems.map(ci => ci.id);
        return this.productInWarehouseService.getProductsRemains(productIds).pipe(
          map(remains => this.MapToOrderItems(cartItems, remains))
        );
      }),
    );
  }

  private MapToOrderItems(cartItems: ICartItem[], remains: IProductRemainsMinified[]) {
    let orderItems: ICreateOrderItem[] = [];
    for (let cartItem of cartItems) {
      let orderItem = {
        selected: false,
        alowedToOrder: false,
        available: null,
        remains: remains.find(r => r.productId == cartItem.id)?.remains!,
        productId: cartItem.id,
        ...cartItem
      };
      orderItems.push(orderItem);
    }
    return orderItems;
  }

  private ProjectToDtos(orderItems: ICreateOrderItem[]): IProductInOrderDto[] {
    return orderItems.map(item => ({productId: item.productId, count: item.count}));
  }

  private getItemsToOrder() {
    return this.items.filter(i => i.selected && i.alowedToOrder);
  }

  private recalculateAvailability() {
    if (!this.recivingWarehouseId)
      return;

    for (let item of this.items) {
      let availableCount = item.remains?.find(r =>
        r.warehouse.id == this.recivingWarehouseId
      )?.count;

      item.available = availableCount ?? 0;
      item.alowedToOrder = !!(availableCount && availableCount >= item.count)
    }
  }

  private recalculateTotal() {
    this.total = this.items.reduce((acc, i) => {
      if (i.selected && i.alowedToOrder)
        acc += i.price * i.count;
      return acc;
    }, 0)
  }
}
