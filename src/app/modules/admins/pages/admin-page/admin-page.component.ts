import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  sidenavItems: {title: string, link: any[]}[] = [
    {title: 'Сотрудники', link: ['employees']},
    {title: 'Магазины', link: ['warehouses']}
  ];
}
