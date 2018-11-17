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
      'width': this.size ? this.size.width + "px" : '100%',
      'height': this.size ? this.size.height + "px" : '30%',
      'background-color': 'red',
      'display': 'inline-block',
      'margin': this.margin.toStringPx(),
    };
  }
  token_size: Size
  margin = new Padding(5);
  @Input() card: Card;
  constructor() { }
  onResize() {
    this.size = this.size.subpadding(this.margin);
    this.token_size = new Size(this.size.height / 4);
  }
  ngOnInit() {
    console.log(this.card);
    this.onResize();
  }

}
