import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalCartService {
  constructor() { }

  private readonly lsCartId = 'cartId';

  public getCartId(): string | null {
    return localStorage.getItem(this.lsCartId);
  }

  public setCartId(id: string) {
    localStorage.setItem(this.lsCartId, id);
  }

  public deleteCartId() {
    localStorage.removeItem(this.lsCartId);
  }
}
