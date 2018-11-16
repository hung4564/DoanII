import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from '@interface/iplayer';
import { Size, Padding } from '@model/Size';

@Component({
  selector: 'player-comp',
  templateUrl: './player-comp.component.html',
  styleUrls: ['./player-comp.component.css']
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
  get countStyles() {
    return {
      'font-size.px': this.token_size.height * 2 / 3
    }
  }
  get tokenStyles() {
    return {
      'padding': (new Padding(5)).toStringPx(),
    }
  }
  constructor() { }

  ngOnInit() {
    this.token_size = (new Size(this.size.width / 9)).subpadding(new Padding(5));
  }

}
