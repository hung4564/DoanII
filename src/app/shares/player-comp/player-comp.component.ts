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
      'height.px': this.size.width / 6 * 3 - 10,
      'padding.px': 5,
      'border': this.player.IsMyTurn ? 'solid 2px' : ''
    };
  }
  get listTokenStyles() {
    return {
      'width': '100%',
      'padding.px': 5
    }
  }
  onResize() {
    let height_token = this.size.width / 6;
    this.token_size = (new Size(height_token).subpadding(new Padding(5)));
  }
  constructor() { }

  ngOnInit() {
    this.onResize();
  }

}
