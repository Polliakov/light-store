import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IWarehouse } from "../../shared/models/warehouse";
import { BaseHttpService } from "../../shared/services/base-http.service";
import { ErrorService } from "../../shared/services/error.service";
import { environment as env } from "src/environments/environment";
import { catchError, Observable } from "rxjs";
import { ICreateWarehouseDto } from "../models/dto/create-warehouse-dto";
import { WarehouseGetService } from "../../shared/services/warehouse-get.service";


@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends WarehouseGetService {
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public get(id: string): Observable<IWarehouse> {
    return this.http.get<IWarehouse>(`${env.apiUrl}/Warehouse/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public create(dto: ICreateWarehouseDto, image: File | null): Observable<string> {
    var multipart = this.toImageMultipart(dto, image);
    return this.http.post<string>(`${env.apiUrl}/Warehouse`, multipart)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public update(dto: ICreateWarehouseDto, image: File | null): Observable<never> {
    var multipart = this.toImageMultipart(dto, image);
    return this.http.put<never>(`${env.apiUrl}/Warehouse`, multipart)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public delete(id: string): Observable<never> {
    return this.http.delete<never>(`${env.apiUrl}/Warehouse/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
