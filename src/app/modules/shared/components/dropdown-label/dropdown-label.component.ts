import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-label',
  templateUrl: './dropdown-label.component.html',
  styleUrls: ['./dropdown-label.component.scss']
})
export class DropdownLabelComponent implements OnInit {
  @Input() title: string;
  @Input() isPreFolded: boolean = false;
  isFolded: boolean;

  ngOnInit() {
    this.isFolded = this.isPreFolded;
  }

  toggle() {
    this.isFolded = !this.isFolded;
  }
}
