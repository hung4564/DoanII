import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from '@interface/iplayer';

@Component({
  selector: 'player-comp',
  templateUrl: './player-comp.component.html',
  styleUrls: ['./player-comp.component.css']
})
export class PlayerCompComponent implements OnInit {
  @Input() player: IPlayer
  constructor() { }

  ngOnInit() {
  }

}
