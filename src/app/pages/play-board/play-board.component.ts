import { Component, OnInit } from '@angular/core';
import { Board } from '@model/board';
import { IPlayer } from '@model/iplayer'
import { UserPlayer } from '@model/Userplayer';
import { AIPlayer } from '@model/AIplayer';
import { Size } from '@model/Size';
import { UserService } from 'app/services/user-service.service';
import { Card } from '@model/card';
import { MessageService } from 'app/services/message.service';
import { Message } from '@model/message';
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
  nobletile_list_size: Size;
  constructor(private _userService: UserService, private _messageSV: MessageService) {

  }
  onResize() {
    let board_body = $('#board-body')
    this.board_size = new Size(board_body.width(), board_body.height());
    let token_list_width = 70;
    this.player_list_size = new Size(300, this.board_size.height);
    this.material_list_size = new Size(token_list_width, this.board_size.height);
    this.nobletile_list_size = new Size(100, this.board_size.height)
    this.card_list_size = new Size(800, this.board_size.height);
    return;

  }
  ngOnInit() {
    this.players = [this._userService.user, new AIPlayer(), new AIPlayer(), new AIPlayer()];
    this.board = new Board(this.players);
    this.board.listPlayer[0].product.forEach(x => x.count = 4)
    this.board.eventBoardNotice.on((x: Message) => this.notice(x))
    this.board.eventEndGame.on(() => this.endGame())
    this.onResize()
  }
  endGame() {
    console.log('endgame');
    this.notice(new Message('endgame'));
  }
  notice(message: Message) {

    this._messageSV.notice(message);
  }
  action($event: { action: string, data?: any }) {
    this.board.actionOfUser($event.action, $event.data)
  }
  setToken(tokenList: { count: number, token_id: any }[]) {
    this.board.setToken(tokenList);
  }
}
