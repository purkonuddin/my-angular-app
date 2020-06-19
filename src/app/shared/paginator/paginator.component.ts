import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  // todo: make sure we receiv this from the parent componenet
  // @Input() numberOfPages: number;
  numberOfPages= 4;
  currentPage = 1;

  pageOptions: number[];

  constructor() {
    this.pageOptions = [
      this.currentPage -2,
      this.currentPage -1,
      this.currentPage,
      this.currentPage +1,
      this.currentPage +2
    ].filter(pageNumber => pageNumber >=1 && pageNumber <= this.numberOfPages);
  }

  ngOnInit(): void {
  }

}
