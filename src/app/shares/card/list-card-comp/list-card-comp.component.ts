import { Component, OnInit, Input } from '@angular/core';
import { Size } from '@model/Size';
import { Card } from '@model/card';

@Component({
  selector: 'list-card-comp',
  templateUrl: './list-card-comp.component.html',
  styleUrls: ['./list-card-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class ListCardCompComponent implements OnInit {
  @Input('cards') cards: Card[][];
  @Input('size-comp') size: Size;
  card_size: Size;
  list_card_size: Size;
  constructor() { }
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
    };
  }
  get listCardStyles() {
    return {
      'width.px': this.list_card_size.width,
      'height.px': this.list_card_size.height,
    }
  }
  onResize() {

    this.list_card_size = new Size(this.size.width, this.size.height / 3);
    this.card_size = new Size(this.list_card_size.width / 4, this.list_card_size.height);
  }
  ngOnInit() {
    this.onResize();
  }

}
