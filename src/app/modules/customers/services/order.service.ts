import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { ErrorService } from '../../shared/services/error.service';
import { environment as env } from 'src/environments/environment';
import { ICreateOrderDto } from '../models/dtos/create-order-dto';
import { IOrder } from '../models/order';
import { IOrderDetails } from '../models/order-details';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpService{
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public getCustomersOrderDetails(orderId: string): Observable<IOrderDetails> {
    return this.http.get<IOrderDetails>(`${env.apiUrl}/Order/ForCustomer/${orderId}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getCustomersOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${env.apiUrl}/Order/ForCustomer`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public create(dto: ICreateOrderDto): Observable<never> {
    return this.http.post<never>(`${env.apiUrl}/Order`, dto).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
