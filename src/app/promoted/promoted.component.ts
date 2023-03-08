import { Component, OnInit } from '@angular/core';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-promoted',
  templateUrl: './promoted.component.html',
  styleUrls: ['./promoted.component.css'],
})
export class PromotedComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
  
  ];
  constructor() {}

  ngOnInit(): void {}
}
