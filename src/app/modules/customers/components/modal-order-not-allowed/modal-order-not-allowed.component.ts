import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-order-not-allowed',
  templateUrl: './modal-order-not-allowed.component.html',
  styleUrls: ['./modal-order-not-allowed.component.scss']
})
export class ModalOrderNotAllowedComponent {
  visible = false;
  @Output() modalClose = new EventEmitter();

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.modalClose.emit();
  }
}
