import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '../../shared/services/error.service';
import { environment as env } from "src/environments/environment";
import { BaseHttpService } from '../../shared/services/base-http.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserRole } from '../../shared/models/user-role';
import { ReplaySubject } from 'rxjs';
import { IEmployee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseHttpService {
  constructor(
    http: HttpClient,
    errorService: ErrorService,
    authService: AuthService
  ) {
    super(http, errorService)

    authService.logoutEvent.subscribe(this.onLogout)
    authService.signIn$.subscribe(role => this.onSignIn(role))
  }

  employee$ = new ReplaySubject<IEmployee | null>(1);

  private onSignIn(role: UserRole) {
    if (role != UserRole.employee){
      this.employee$.next(null);
      return;
    }
    this.http.get<IEmployee>(`${env.apiUrl}/Customer/Authed`).subscribe({
      next: c => this.employee$.next(c),
      error: this.handleError.bind(this)
    });
  }

  private onLogout = () => {
    this.employee$.next(null);
  }
}
