import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MathUtils } from '../../utils/math-utils';

interface IBounds {
  left:  { ellipsis: boolean } | null
  right: { ellipsis: boolean } | null
}

@Component({
  selector: 'app-pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.scss']
})
export class PaginationControlComponent {
  @Input() elementsCount: number;
  @Input() pageSize: number;
  @Input() currentPage = 1;
  @Output() pageChanged = new EventEmitter<number>();

  private readonly size = 5;
  private readonly nearbyPages = Math.floor(this.size / 2);

  get leftBound(): { ellipsis: boolean } | null {
    let pagesCount = this.pagesCount;
    if (pagesCount <= this.size)
      return null;

    let bound  = this.currentPage - this.nearbyPages;
    return bound > 1 ? { ellipsis: (bound > 2) } : null;
  }

  get rightBound(): { ellipsis: boolean } | null {
    let pagesCount = this.pagesCount;
    if (pagesCount <= this.size)
      return null;

    let bound = this.currentPage + this.nearbyPages;
    return bound < pagesCount?
      { ellipsis: (bound < pagesCount - 1) } :  null;
  }

  get pagesRange(): number[] {
    let pagesCount = this.pagesCount;
    let actualSize = this.size > pagesCount ? pagesCount : this.size;

    let leftBound = MathUtils.clamp(
      this.currentPage - this.nearbyPages, 1, pagesCount - (actualSize - 1)
    );
    return Array<number>(actualSize).fill(0).map((_, index) => leftBound + index);
  }

  get pagesCount(): number {
    return Math.ceil(this.elementsCount / this.pageSize)
  }

  onPageBtnClick(selectedPage: number) {
    if (selectedPage != this.currentPage) {
      this.currentPage = selectedPage;
      this.pageChanged.emit(selectedPage);
    }
  }
}
