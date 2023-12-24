import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent {
  sidenavItems: {title: string, link: any[]}[] = [
    {title: 'Заказы', link: ['orders']},
    {title: 'Поступления', link: ['products-addings']},
    {title: 'Каталог', link: ['products']},
    {title: 'Категории', link: ['categories']}
  ];
}
