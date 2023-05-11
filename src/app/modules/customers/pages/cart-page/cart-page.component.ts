import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/modules/customers/models/cart-item';
import { ICartItemDto } from 'src/app/modules/customers/models/dtos/cart-item-dto';
import { CartService } from 'src/app/modules/customers/services/cart.service';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { ModalPleaseSignupComponent } from '../../components/modal-please-signup/modal-please-signup.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit{
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  @ViewChild('modalPleaseSignUp') modalPleaseSignUp: ModalPleaseSignupComponent;

  items: ICartItem[];
  loading = false;
  total: number;

  ngOnInit() {
    this.loading = true;
    this.cartService.getItems().subscribe(items => {
      this.loading = false;
      this.items = items;
      this.recalculateTotal();
    });
  }

  onOrderBtnClick() {
    this.authService.isAuthenticated$.subscribe(isAuthed => {
        if (isAuthed) {
          this.router.navigate(['/order-creating']);
          return;
        }
        this.modalPleaseSignUp.show();
      }
    )
  }

  onCountChange(dto: ICartItemDto) {
    this.cartService.changeCount(dto.productId, dto.count).subscribe(() =>
      this.recalculateTotal()
    );
  }

  onRemove(id: string) {
    this.cartService.deleteItem(id).subscribe(() => {
        this.items.splice(this.items.findIndex(i => i.id == id), 1);
        this.recalculateTotal();
    });
  }

  private recalculateTotal() {
    this.total = this.items.reduce((acc, i) => acc + i.price * i.count, 0)
  }
}
