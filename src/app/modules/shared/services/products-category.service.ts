import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { IProductsCategory } from '../models/products-category';
import { ErrorService } from './error.service';
import { environment as env } from 'src/environments/environment';
import { BaseHttpService } from './base-http.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsCategoryService extends BaseHttpService{
  constructor(
    http: HttpClient,
    errorService: ErrorService
  ) {
    super(http, errorService);
  }

  public getAll(): Observable<IProductsCategory[]> {
    return this.http.get<IProductsCategory[]>(`${env.apiUrl}/ProductsCategory`)
      .pipe(
        catchError(this.handleError.bind(this)),
        tap(cs => {
          this.setParentCategory(cs);
        })
      );
  }

  private setParentCategory(
    children: IProductsCategory[] | null,
    parent: IProductsCategory | null = null
  ) {
    if (!children) return;

    for (let child of children) {
      child.parentCategory = parent;
      this.setParentCategory(child.childСategories, child);
    }
  }
}
