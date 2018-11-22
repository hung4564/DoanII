import { Component, OnInit } from '@angular/core';
import { Board } from '@model/board';
import { IPlayer } from '@model/iplayer'
import { UserPlayer } from '@model/Userplayer';
import { AIPlayer } from '@model/AIplayer';
import { Size } from '@model/Size';
import { UserService } from 'app/services/user-service.service';
import { Card } from '@model/card';
import { MessageService } from 'app/services/message.service';
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
  material_list_size: Size;
  constructor(private _userService: UserService, private _messageSV: MessageService) {

  }
  onResize() {
    let board_body = $('#board-body')
    this.board_size = new Size(board_body.width(), board_body.height());
    this.player_list_size = new Size(this.board_size.width * 0.3, this.board_size.height);
    this.card_list_size = new Size(this.board_size.width * 0.6, this.board_size.height);
    this.material_list_size = new Size(this.board_size.width * 0.1, this.board_size.height);

  }
  ngOnInit() {
    this.players = [this._userService.user, new AIPlayer(), new AIPlayer(), new AIPlayer()];
    this.board = new Board(this.players);
    this.onResize()
  }
  action($event) {
    switch ($event.action) {
      case 'hold':
        this.holdCard($event.card)
        break;
      case 'buy':
        this.buyCard($event.card);
        break;
    }
  }
  buyCard(card: Card) {
    try {
      this.board.buyCard(card)
    } catch (error) {
      this._messageSV.showWarningMessage(error);
    }

  }
  holdCard(card: Card) {
    this.board.holdCard(card);
  }
  setToken(tokenList: { count: number, token_id: any }[]) {
    this.board.setToken(tokenList);
  }
}
