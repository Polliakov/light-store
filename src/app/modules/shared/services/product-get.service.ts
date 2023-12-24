import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { ErrorService } from "./error.service";
import { BaseHttpService } from "./base-http.service";
import { IProductDetails } from "../models/product-details";
import { IProductsPageDto } from "../models/dtos/products-page-dto";
import { IProductItemsPageDto } from "../models/dtos/product-items-page-dto";
import { IPaginationArgs } from "../models/dtos/pagination-args";
import { IProductFilterArgs } from "../models/dtos/product-filter-args";

@Injectable({
  providedIn: 'root'
})
export class ProductGetService extends BaseHttpService{
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public getItemsPage(
    pagination: IPaginationArgs,
    filtering: IProductFilterArgs
  ): Observable<IProductItemsPageDto>
  {
    return this.http.get<IProductItemsPageDto>(`${env.apiUrl}/ProductItemsPage`, {
      params: this.toQueryParams(pagination, filtering)
    }).pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public getPage(
    pagination: IPaginationArgs,
    filtering: IProductFilterArgs
  ): Observable<IProductsPageDto>
  {
    return this.http.get<IProductsPageDto>(`${env.apiUrl}/ProductsPage`, {
      params: this.toQueryParams(pagination, filtering)
    }).pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public getDetails(id: string): Observable<IProductDetails> {
    return this.http.get<IProductDetails>(`${env.apiUrl}/Product/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  protected toQueryParams(
    pagination: IPaginationArgs,
    filtering: IProductFilterArgs
  ): HttpParams
  {
    let {page, pageSize} = pagination; // Typing...
    let queryParams = new HttpParams({fromObject: {page, pageSize}});
    for (let param in filtering) {
      let paramValue = (filtering as any)[param];
      if (paramValue)
        queryParams = queryParams.append(param, paramValue);
    }
    return queryParams;
  }
}
