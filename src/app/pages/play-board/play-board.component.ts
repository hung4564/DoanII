import { Component, OnInit } from '@angular/core';
import { Board } from '@model/board';
import { IPlayer } from '@interface/iplayer'
import { UserPlayer } from '@model/Userplayer';
import { AIPlayer } from '@model/AIplayer';
import { Size } from '@model/Size';
declare var $: any;
@Component({
  selector: 'app-play-board',
  templateUrl: './play-board.component.html',
  styleUrls: ['./play-board.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})

export class PlayBoardComponent implements OnInit {
  board: Board;
  players: IPlayer[];
  board_size: Size;
  player_list_size: Size;
  card_list_size: Size;
  constructor() {
    this.players = [new UserPlayer(), new AIPlayer(), new AIPlayer(), new AIPlayer()];
    this.board = new Board(this.players);

  }
  onResize() {
    let board_body = $('#board-body')
    this.board_size = new Size(board_body.width(), board_body.height());
    this.player_list_size = new Size(this.board_size.width * 0.3, this.board_size.height);
    this.card_list_size = new Size(this.board_size.width * 0.6, this.board_size.height);
  }
  ngOnInit() {
    this.onResize()
  }

}
