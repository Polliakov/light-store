import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.scss']
})
export class EmployeeHeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  onBtnLogoutClick() {
    this.authService.logout();
  }
}
