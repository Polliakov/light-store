import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent {
  @Output() selected = new EventEmitter<File>();

  imageName: string;

  onFileSelected(event: any) {
    const image: File = event.target.files[0];
    if (!image) return;

    this.imageName = image.name;
    this.selected.emit(image);
  }
}
