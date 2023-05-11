import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() shadingClick = new EventEmitter();

  onShadingClick(event: MouseEvent) {
    if ((event.target as any).classList.contains('shading'))
      this.shadingClick.emit();
  }
}
