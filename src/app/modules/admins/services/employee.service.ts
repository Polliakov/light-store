import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment as env } from "src/environments/environment";
import { BaseHttpService } from "../../shared/services/base-http.service";
import { ErrorService } from "../../shared/services/error.service";
import { ICreateEmployeeDto } from "../models/dto/create-employee-dto";
import { IEmployee } from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseHttpService{
  constructor(
    http: HttpClient,
    errorService: ErrorService,
  ) {
    super(http, errorService);
  }

  public getAll(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${env.apiUrl}/Employee`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public signUp(dto: ICreateEmployeeDto): Observable<string> {
    return this.http.post<string>(`${env.apiUrl}/Employee`, dto).pipe(
      catchError(e => {
        return e.status == HttpStatusCode.Conflict ?
          throwError(() => e.status) :
          this.handleError(e);
      })
    );
  }

  public delete(id: string): Observable<never> {
    return this.http.delete<never>(`${env.apiUrl}/Employee/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
