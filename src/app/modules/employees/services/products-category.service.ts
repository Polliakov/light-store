import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment as env } from "src/environments/environment";
import { IProductsCategory } from '../../shared/models/products-category';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { ErrorService } from '../../shared/services/error.service';
import { ICreateProductsCategoryDto } from '../models/dtos/create-products-category-dto';
import { IUpdateProductsCategoryDto } from '../models/dtos/update-products-category-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductsCategoryService extends BaseHttpService {
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public get(id: string): Observable<IProductsCategory> {
    return this.http.get<IProductsCategory>(`${env.apiUrl}/ProductsCategory/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public create(dto: ICreateProductsCategoryDto, image: File): Observable<string> {
    let multipart = this.toImageMultipart(dto, image);
    return this.http.post<string>(`${env.apiUrl}/ProductsCategory`, multipart)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public update(dto: IUpdateProductsCategoryDto, image: File): Observable<never> {
    let multipart = this.toImageMultipart(dto, image);
    return this.http.put<never>(`${env.apiUrl}/ProductsCategory`, multipart)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public delete(id: string): Observable<never> {
    return this.http.delete<never>(`${env.apiUrl}/ProductsCategory/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
