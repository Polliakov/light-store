import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-accept',
  templateUrl: './modal-accept.component.html',
  styleUrls: ['./modal-accept.component.scss']
})
export class ModalAcceptComponent {
  @Input() title: string;
  @Output() accepted = new EventEmitter();
  @Output() rejected = new EventEmitter();

  visible: boolean;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  accept() {
    this.visible = false;
    this.accepted.emit();
  }

  reject() {
    this.visible = false;
    this.rejected.emit();
  }
}
