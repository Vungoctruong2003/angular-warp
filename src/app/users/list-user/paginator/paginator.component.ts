import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  private _currentPage!: number;
  private _totalPage!: number;
  private _pages: number[] = [];
  private _optionPerPage: number[] = [10, 20, 50];
  selectedPerPage: number = 10;

  @Output() toPageEvent = new EventEmitter<number>();

  @Output() toPerPageEvent = new EventEmitter<number>();

  toPage(value: number) {
    this.toPageEvent.emit(value);
  }

  toPerPage(value: number) {
    this.toPerPageEvent.emit(value);
  }

  @Input() set currentPage(value) {
    this._currentPage = value;
  };

  get currentPage() {
    return this._currentPage;
  }

  @Input() set totalPage(value) {
    this._totalPage = value;

    this._pages = value < 1 ? [] : [1];
    for (let i = 2; i <= value; i++) {
      this._pages.push(i);
    }
  };

  get totalPage() {
    return this._totalPage;
  }

  get pages() {
    return this._pages;
  }

  get optionPerPages() {
    return this._optionPerPage;
  }

}
