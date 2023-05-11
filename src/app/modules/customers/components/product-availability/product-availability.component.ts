import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-availability',
  templateUrl: './product-availability.component.html',
  styleUrls: ['./product-availability.component.scss']
})
export class ProductAvailabilityComponent {
  @Input() availabilityCount: number;
  @Output() showRemainsNeeded = new EventEmitter<never>();

  showRemains() {
    this.showRemainsNeeded.emit();
  }
}
