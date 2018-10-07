import { Component, OnInit, Input } from '@angular/core';
import { Player } from '@model/player';

@Component({
  selector: 'player-comp',
  templateUrl: './player-comp.component.html',
  styleUrls: ['./player-comp.component.css']
})
export class PlayerCompComponent implements OnInit {
  @Input() player: Player
  constructor() { }

  ngOnInit() {
  }

}
