import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IPaginationArgs } from '../../shared/models/dtos/pagination-args';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { ErrorService } from '../../shared/services/error.service';
import { IOrdersPageDto } from '../models/dtos/orders-page-dto';
import { environment as env } from "src/environments/environment";
import { IOrderDetails } from '../models/order-details';
import { OrderStatus } from '../../shared/models/order-status';
import { IChangeOrderStatusDto } from '../models/dtos/change-order-status-dto';

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

  public getDetails(id: string): Observable<IOrderDetails> {
    return this.http.get<IOrderDetails>(`${env.apiUrl}/Order/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  public getPage(pagination: IPaginationArgs): Observable<IOrdersPageDto> {
    let {page, pageSize} = pagination;

    return this.http.get<IOrdersPageDto>(`${env.apiUrl}/Order`, {
      params: { page, pageSize }
    }).pipe(
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * @deprecated
   */
  public changeStatus(dto: IChangeOrderStatusDto): Observable<never> {
    return this.http.patch<never>(`${env.apiUrl}/Order/StatusChange`, dto).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
