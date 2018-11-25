import { Component, OnInit, Input } from '@angular/core';
import { Size, Padding } from '@model/Size';
import { IPlayer } from '@model/iplayer'
@Component({
  selector: 'list-player-comp',
  templateUrl: './list-player-comp.component.html',
  styleUrls: ['./list-player-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class ListPlayerCompComponent implements OnInit {
  @Input('size-comp') size: Size;
  @Input() players: IPlayer[];
  player_size: Size;
  constructor() { }
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': 'yellow'
    };
  }
  onResize() {
    let player_height = this.size.height / this.players.length;
    this.player_size = new Size(this.size.width, player_height);
  }
  ngOnInit() {
    this.onResize();
  }

}