import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from '@model/iplayer';
import { Size, Padding } from '@model/Size';

@Component({
  selector: 'player-comp',
  templateUrl: './player-comp.component.html',
  styleUrls: ['./player-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class PlayerCompComponent implements OnInit {
  @Input() player: IPlayer;
  @Input('size-comp') size: Size;
  token_size: Size;
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
    };
  }
  get listTokenStyles() {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height / 3,
      'padding': (new Padding(5)).toStringPx(),
    }
  }
  onResize() {
    let height_token;
    if (this.size.width / 7 > this.size.height / 3) {
      height_token = this.size.height / 3
    }
    else {
      height_token = this.size.width / 7
    }
    this.token_size = (new Size(height_token)).subpadding(new Padding(5));
  }
  constructor() { }

  ngOnInit() {
    this.onResize();
  }

}
