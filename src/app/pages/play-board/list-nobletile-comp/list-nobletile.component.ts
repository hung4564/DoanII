import { Component, OnInit, Input } from '@angular/core';
import { Size } from '@model/Size';
import { Nobletile } from '@model/nobletile';

@Component({
  selector: 'list-nobletile-comp',
  templateUrl: './list-nobletile.component.html',
  styleUrls: ['./list-nobletile.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class ListNobletileComponent implements OnInit {

  @Input('size-comp') size: Size;
  @Input() nobletiles: Nobletile[]
  card_size: Size;
  token_size: Size;
  get cardStyles() {
    return {
      'width.px': this.card_size.width,
      'height.px': this.card_size.height,
    };
  }
  constructor() { }

  onResize() {
    this.card_size = new Size(this.size.width, this.size.width * 3 / 2);
    this.token_size = new Size(this.card_size.width / 2);
  }
  ngOnInit() {
    this.onResize();
  }

}
