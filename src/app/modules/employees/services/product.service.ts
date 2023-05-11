import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { ICreateProductDto } from "../../employees/models/dtos/create-product-dto";
import { ErrorService } from "../../shared/services/error.service";
import { IUpdateProductDto } from "../models/dtos/update-product-dto";
import { ProductGetService } from "../../shared/services/product-get.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ProductGetService {
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public create(dto: ICreateProductDto, image: File): Observable<string> {
    let multipart = this.toImageMultipart(dto, image);
    return this.http.post<string>(`${env.apiUrl}/Product`, multipart)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public update(dto: IUpdateProductDto, image: File): Observable<never> {
    let multipart = this.toImageMultipart(dto, image);
    return this.http.put<never>(`${env.apiUrl}/Product`, multipart)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public delete(id: string): Observable<never> {
    return this.http.delete<never>(`${env.apiUrl}/Product/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
