import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() OpenPlayer = new EventEmitter<any>();
  player_size: Size;
  constructor() { }
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
    };
  }
  onResize() {
    let player_height = this.size.height / this.players.length;
    this.player_size = new Size(this.size.width, player_height);
  }
  ngOnInit() {
    this.onResize();
  }
  openModalPlayer(id: number) {
    this.OpenPlayer.emit({ player_id: id });
  }

}
