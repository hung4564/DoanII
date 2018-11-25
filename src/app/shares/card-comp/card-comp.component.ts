import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@model/card';
import { Size, Padding } from '@model/Size';
@Component({
  selector: 'card-comp',
  templateUrl: './card-comp.component.html',
  styleUrls: ['./card-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class CardCompComponent implements OnInit {
  @Input('size-comp') size: Size;
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': 'red',
    };
  }
  token_size: Size
  @Input() card: Card;
  constructor() { }
  onResize() {
    this.size.width = this.size.height * 2 / 3;
    this.token_size = new Size(this.size.height / 6);
  }
  ngOnInit() {
    this.onResize();
  }

}
