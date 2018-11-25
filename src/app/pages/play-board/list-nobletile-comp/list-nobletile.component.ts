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
  card_size: Size
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': 'yellow'
    };
  }
  constructor() { }

  onResize() {
    this.card_size = new Size(this.size.height / 4);
  }
  ngOnInit() {
    this.onResize();
  }

}
