import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent {
  constructor(private authService: AuthService, private router: Router) {

  }

  sidenavItems: {title: string, link: any[]}[] = [
    {title: 'Заказы', link: ['orders']},
    {title: 'Учётная запись', link: ['personal']}
  ];

  onBtnLogoutClick() {
    this.authService.logout();
  }
}
