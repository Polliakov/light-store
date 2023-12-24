import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWarehouseMinified } from '../models/warehouse-minified';
import { BaseHttpService } from './base-http.service';
import { ErrorService } from './error.service';
import { environment as env } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
import { IWarehouse } from '../models/warehouse';


@Injectable({
  providedIn: 'root'
})
export class WarehouseGetService extends BaseHttpService {
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService)
  }

  public getAll(): Observable<IWarehouse[]> {
    return this.http.get<IWarehouse[]>(`${env.apiUrl}/Warehouse`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public getAllMinified(): Observable<IWarehouseMinified[]> {
    return this.http.get<IWarehouseMinified[]>(`${env.apiUrl}/Warehouse/Minified`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
