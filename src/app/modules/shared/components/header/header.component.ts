import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserRole } from 'src/app/modules/shared/models/user-role';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  get isAuthed() {
    return this.authService.isAuthenticated$;
  }

  getProfileLink(): Observable<string> {
    return this.authService.userRole$.pipe(
      switchMap(role => {
        switch (role) {
          case UserRole.customer:
            return ['/profile/orders'];
          case UserRole.employee:
            return ['/employee/orders'];
          case UserRole.admin:
            return ['/admin/employees'];
          default:
            return ['/'];
        }
      })
    );
  }

  onBtnLogoutClick() {
    this.authService.logout();
  }
}
