import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() {
    console.log('ErrorService is instantiated.')
  }

  error$ = new Subject<string>();
  unauthorized = new EventEmitter();

  public handle(message: string) {
    this.error$.next(message);
  }

  public handleHttpError(error: HttpErrorResponse) {
    switch (error.status) {
      case HttpStatusCode.Unauthorized:
        this.unauthorized.emit();
        break;
      case HttpStatusCode.Forbidden:
        this.error$.next('Отказано в доступе.')
        break;
      default:
        this.error$.next(error.message);
    }
  }

  public clear() {
    this.error$.next('');
  }
}
