import { Component, OnInit, Input } from '@angular/core';
import { Size } from '@model/Size';
@Component({
  selector: 'list-material-comp',
  templateUrl: './list-material-comp.component.html',
  styleUrls: ['./list-material-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class ListMaterialCompComponent implements OnInit {
  @Input('size-comp') size: Size;
  @Input() materials: { count: number, token_id: number };
  player_size: Size;
  token_size: Size;
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': 'green'
    };
  }
  constructor() { }
  onResize() {
    this.token_size = new Size(this.size.width * 0.5);
  }
  ngOnInit() {
    this.onResize();
  }

}
