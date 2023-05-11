import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError, catchError, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { ICustomer } from '../models/customer';
import { ICreateCustomerDto } from '../models/dtos/create-customer-dto';
import { ICustomerSignUpResponseDto } from '../models/dtos/customer-signup-response-dto';
import { UserRole } from '../../shared/models/user-role';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorService } from '../../shared/services/error.service';
import { LocalCartService } from './local-cart.service';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { IUpdateCustomerDto } from '../models/dtos/update-customer-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseHttpService{

  constructor(
    http: HttpClient,
    errorService: ErrorService,
    private localCart: LocalCartService,
    private authService: AuthService
  ) {
    super(http, errorService);

    authService.logoutEvent.subscribe(this.onLogout)
    authService.signIn$.subscribe(role => this.onSignIn(role))
  }

  public customer$ = new ReplaySubject<ICustomer | null>(1)

  public getCartId(): Observable<string | null> {
    return new Observable<string | null>(observer => this.customer$.subscribe(
      c => {
        observer.next(c?.cartId)
        observer.complete();
      }
    ));
  }

  public signUp(dto: ICreateCustomerDto): Observable<ICustomerSignUpResponseDto> {
    dto.cartId = this.localCart.getCartId();
    return this.http.post<ICustomerSignUpResponseDto>(`${env.apiUrl}/Customer`, dto).pipe(
      catchError(e => {
        return e.status == HttpStatusCode.Conflict ?
          throwError(() => e.status) :
          this.handleError(e);
      }),
      tap(r => {
        this.authService.setToken(r.token);
        this.authService.user$.next(r.appUser);
        this.localCart.deleteCartId();
        this.customer$.next(r.customer);
      })
    );
  }

  public update(dto: IUpdateCustomerDto): Observable<never> {
    return this.http.put<never>(`${env.apiUrl}/Customer`, dto).pipe(
      catchError(e => this.handleError(e)),
      tap(() => this.updateOnClient(dto))
    );
  }

  private onSignIn(role: UserRole) {
    if (role != UserRole.customer){
      this.customer$.next(null);
      return;
    }
    this.http.get<ICustomer>(`${env.apiUrl}/Customer/Authed`).subscribe({
      next: c => this.customer$.next(c),
      error: this.handleError.bind(this)
    });
  }

  private onLogout = () => {
    this.customer$.next(null);
  }

  private updateOnClient(dto: IUpdateCustomerDto) {
    this.customer$.subscribe({
      next: c => {
        if (!c) return;
        let newCustomer = dto as ICustomer
        newCustomer.cartId = c.cartId;
        this.customer$.next(newCustomer);
      }
    });
  }
}
