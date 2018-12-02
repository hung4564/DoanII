import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@model/card';
import { Size, Padding } from '@model/Size';
import { Token } from '@model/token';
import { materials } from '@data/token';
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
  token_size: Size
  @Input() card: Card;
  token: Token;
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': '#' + this.token.color + '33',
      'border': 'solid 2px',
      'color': '#' + this.token.color + 'CC',
    };
  }
  constructor() { }
  onResize() {
    this.size.width = this.size.height * 2 / 3;
    this.token_size = new Size(this.size.height / 6);
  }
  ngOnInit() {
    this.token = materials.find(x => x.id == this.card.value.token_id);
    this.onResize();
  }

}
