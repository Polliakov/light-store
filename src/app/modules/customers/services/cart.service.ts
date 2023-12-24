import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, switchMap } from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';
import { ICartItem } from '../models/cart-item';
import { environment as env } from 'src/environments/environment';
import { ICartItemDto } from '../models/dtos/cart-item-dto';
import { CustomerService } from './customer.service';
import { LocalCartService } from './local-cart.service';
import { BaseHttpService } from '../../shared/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseHttpService{
  constructor(
    http: HttpClient,
    errorService: ErrorService,
    private customerService: CustomerService,
    private localCart: LocalCartService
  ) {
    super(http, errorService);
  }

  public getItems(): Observable<ICartItem[]> {
    return this.getCartId().pipe(
      switchMap(id =>

        this.http.get<ICartItem[]>(`${env.apiUrl}/Cart/${id}`)
          .pipe(
            catchError(e => {
              if (e.status == HttpStatusCode.NotFound)
                this.localCart.deleteCartId();
              return this.handleError(e);
            })
          )
      )
    );
  }

  public createCart(): Observable<string> {
    return this.http.post<string>(`${env.apiUrl}/Cart/Create`, null)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public addItem(productId: string, count: number = 1): Observable<ICartItemDto> {
    return this.getCartId().pipe(
      switchMap(id =>

        this.http.post<ICartItemDto>(`${env.apiUrl}/Cart/${id}`, {productId, count})
          .pipe(
            catchError(this.handleError.bind(this))
          )
      )
    );
  }

  public changeCount(itemId: string, count: number): Observable<ICartItemDto> {
    return this.getCartId().pipe(
      switchMap(id =>

        this.http.put<ICartItemDto>(`${env.apiUrl}/Cart/${id}`, {productId: itemId, count})
          .pipe(
            catchError(this.handleError.bind(this))
          )
      )
    );
  }

  public deleteItem(itemId: string): Observable<Object> {
    return this.getCartId().pipe(
      switchMap(id =>

        this.http.delete(`${env.apiUrl}/Cart/${id}/Item/${itemId}`)
          .pipe(
            catchError(this.handleError.bind(this))
          )
      )
    );
  }

  public getCartId(): Observable<string> {
    return this.customerService.getCartId().pipe(
      switchMap(cId => {
        if (cId) {
          return of(cId);
        }
        return this.useLocalCartId();
      })
    );
  }

  private useLocalCartId(): Observable<string> {
    let id = this.localCart.getCartId();
    if (id) {
      return of(id);
    }
    return this.createCart().pipe(
      tap(newId =>
        this.localCart.setCartId(newId)
      )
    );
  }
}
