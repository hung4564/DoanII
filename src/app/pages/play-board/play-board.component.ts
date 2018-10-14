import { Component, OnInit } from '@angular/core';
import { Board } from '@model/board';
import { IPlayer } from '@interface/iplayer'
import { UserPlayer } from '@model/Userplayer';
import { AIPlayer } from '@model/AIplayer';
@Component({
  selector: 'app-play-board',
  templateUrl: './play-board.component.html',
  styleUrls: ['./play-board.component.css']
})
export class PlayBoardComponent implements OnInit {
  board: Board;
  players: IPlayer[];
  constructor() {
    this.players = [new UserPlayer(), new AIPlayer()];
    this.board = new Board(this.players);
  }
  ngOnInit() {
  }

}
