import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('input') input: ElementRef;
  @Input() maxLength = 64;
  @Output() search = new EventEmitter<string>();
  @Output() searchReset = new EventEmitter();

  isBtnClearHidder = true;

  onSearchInput() {
    let inputValue: string | null = this.input.nativeElement.value;
    if (!inputValue) {
      this.isBtnClearHidder = true;
      return;
    }
    this.isBtnClearHidder = false;
    if (inputValue.length > this.maxLength)
      this.input.nativeElement.value = inputValue.slice(0, this.maxLength);
  }

  clearInput() {
    this.input.nativeElement.value = null;
    this.isBtnClearHidder = true;
    this.searchReset.emit();
  }

  emitSearch() {
    let noSpaceValue = this.input.nativeElement.value?.trim();
    if (noSpaceValue)
      this.search.emit(noSpaceValue);
    else
      this.searchReset.emit();
  }
}
