import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { ErrorService } from './error.service';
import { environment as env } from "src/environments/environment";
import { IProductInWarehouse } from '../models/product-in-warehouse';
import { catchError, Observable } from 'rxjs';
import { IProductRemainsMinified } from '../models/product-remains-minified';


@Injectable({
  providedIn: 'root'
})
export class ProductInWarehouseService extends BaseHttpService{
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public getProductRemains(productId: string): Observable<IProductInWarehouse[]> {
    return this.http.get<IProductInWarehouse[]>(`${env.apiUrl}/ProductInWarehouse`, {params: {productId}})
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public getProductsRemains(productIds: string[]): Observable<IProductRemainsMinified[]> {
    return this.http.post<IProductRemainsMinified[]>(`${env.apiUrl}/ProductInWarehouse/MinifiedGeting`, productIds)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
