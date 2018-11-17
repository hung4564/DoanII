import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@model/card';
import { Size, Padding } from '@model/Size';
@Component({
  selector: 'card-comp',
  templateUrl: './card-comp.component.html',
  styleUrls: ['./card-comp.component.css']
})
export class CardCompComponent implements OnInit {
  @Input('size-comp') size: Size;
  get myStyles(): any {
    return {
      'width': this.size ? this.size.width + "px" : '100%',
      'height': this.size ? this.size.height + "px" : '30%',
      'background-color': 'red',
      'display': 'inline-block',
      'padding': this.padding.toStringPx(),
    };
  }
  padding = new Padding(5);
  @Input() card: Card;
  constructor() { }

  ngOnInit() {
    this.size = this.size.subpadding(this.padding);
  }

}
