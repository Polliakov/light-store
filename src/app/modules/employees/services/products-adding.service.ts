import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { ErrorService } from '../../shared/services/error.service';
import { environment as env } from "src/environments/environment";
import { catchError, Observable } from 'rxjs';
import { IProductsAdding } from '../models/products-adding';
import { ICreateProductsAddingDto } from '../models/dtos/create-products-adding-dto';
import { IProductsAddingDetails } from '../models/products-adding-details';

@Injectable({
  providedIn: 'root'
})
export class ProductsAddingService extends BaseHttpService {
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService)
  }

  public getDetails(id: string): Observable<IProductsAddingDetails> {
    return this.http.get<IProductsAddingDetails>(`${env.apiUrl}/ProductsAdding/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public getAll(): Observable<IProductsAdding[]> {
    return this.http.get<IProductsAdding[]>(`${env.apiUrl}/ProductsAdding`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public create(dto: ICreateProductsAddingDto): Observable<string> {
    return this.http.post<string>(`${env.apiUrl}/ProductsAdding`, dto)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
