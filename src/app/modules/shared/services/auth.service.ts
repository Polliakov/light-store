import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap, ReplaySubject, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { AppJwtModule } from '../../jwt/app-jwt.module';
import { ErrorService } from './error.service';
import { IUser } from '../models/user';
import { IAuthResponseDto } from '../models/dtos/auth-response-dto';
import { Router } from '@angular/router';
import { UserRole } from '../models/user-role';
import { BaseHttpService } from './base-http.service';
import { IChangePasswordDto } from '../models/dtos/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {
  constructor(
    http: HttpClient,
    errorService: ErrorService,
    private router: Router
  ) {
    super(http, errorService);
    errorService.unauthorized.subscribe(() => {
      this.logout(false);
      router.navigate(['/authentication']);
    });

    http.get<IUser>(`${env.apiUrl}/AppUser/Authed`).subscribe({
      next: u => {
        this.user$.next(u);
        this.signIn$.next(u.role);
      },
      error: e =>
        e.status == HttpStatusCode.Unauthorized ||
        e.status == HttpStatusCode.NotFound ?
        this.logout() :
        this.handleError(e)
    });
  }

  signIn$ = new ReplaySubject<UserRole>(1);
  logoutEvent = new EventEmitter();

  user$ = new ReplaySubject<IUser | null>(1);

  get isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(map(u => !!u));
  }

  get userRole$(): Observable<UserRole | null> {
    return this.user$.pipe(map(u => u ? u.role : null));
  }

  public signIn(email: string, password: string): Observable<IAuthResponseDto> {
    return this.http.post<IAuthResponseDto>(`${env.apiUrl}/AppUser/SignIn`, { email, password })
      .pipe(
        catchError(e => {
          return e.status == HttpStatusCode.Unauthorized ?
            throwError(() => e.status) :
            this.handleError(e);
        }),
        tap(r => {
          this.user$.next(r.appUser);
          this.setToken(r.token);
          this.signIn$.next(r.appUser.role);
        }
        )
      );
  }

  public changePassword(dto: IChangePasswordDto): Observable<never> {
    return this.http.post<never>(`${env.apiUrl}/AppUser/PasswordChange`, dto)
      .pipe(
        catchError(e =>
          e.status == HttpStatusCode.Unauthorized ?
            throwError(() => e.status) :
            this.handleError(e)
        ),
        tap(() =>
          this.logout()
        )
      );
  }

  public setToken(token: string) {
    localStorage.setItem(AppJwtModule.lsJwtAccess, token);
  }

  public logout(navigateRoot = true) {
    this.user$.next(null);
    localStorage.removeItem(AppJwtModule.lsJwtAccess);
    this.logoutEvent.emit();

    if (navigateRoot)
      this.router.navigate(['/']);
  }
}
