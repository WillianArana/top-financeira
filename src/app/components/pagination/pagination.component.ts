import { Component, EventEmitter, Input, Output } from '@angular/core';

type Pagination = {
  last: number;
};

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  current = 1;

  @Output() page = new EventEmitter<number>();
  @Input() set data(v: Pagination) {
    const current = this.current;
    const items = [];
    for (let i = 1; i <= v.last; i++) {
      items.push({
        value: i,
        current: i === current,
      });
    }
    this.isFirst = items[0].current;
    this.isLast = items[items.length - 1].current;
    this.items = items;
  }

  items: {
    value: number;
    current: boolean;
  }[] = [];

  isFirst = true;
  isLast = true;

  public next(): void {
    this.emit(this.current + 1);
  }

  public emit(page: number): void {
    this.current = page;
    const last = this.items[this.items.length - 1].value;
    this.data = { last };
    this.page.emit(page);
  }

  public prev(): void {
    this.emit(this.current - 1);
  }
}

/*

<http://localhost:3000/custormer?_page=1&_limit=4&_sort=birthDate&_order=asc>; rel="first",
<http://localhost:3000/custormer?_page=2&_limit=4&_sort=birthDate&_order=asc>; rel="next",
<http://localhost:3000/custormer?_page=3&_limit=4&_sort=birthDate&_order=asc>; rel="last"
*/

/*
<http://localhost:3000/custormer?_page=1&_limit=4&_sort=birthDate&_order=asc>; rel="first",
<http://localhost:3000/custormer?_page=2&_limit=4&_sort=birthDate&_order=asc>; rel="prev",
 <http://localhost:3000/custormer?_page=3&_limit=4&_sort=birthDate&_order=asc>; rel="last"
*/

/*

{
    next: 2,
    last: 1,
  };

  */
