import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from '@model/board';
import { IPlayer } from '@model/iplayer'
import { UserPlayer } from '@model/Userplayer';
import { AIPlayer } from '@model/AIplayer';
import { Size, Padding } from '@model/Size';
import { UserService } from 'app/services/user-service.service';
import { Card } from '@model/card';
import { MessageService } from 'app/services/message.service';
import { Message } from '@model/message';
import { SetMaterialDialog, RefundMaterialDialog } from './dialog/material.dialog.component';
import { MatDialog } from '@angular/material';
import { endGameDialog } from './dialog/endgame.dialog.component';
import { Route, Router } from '@angular/router';
import { CountdownComponent } from '@share/countdown/countdown.component';
import { ConfigDialogComponent } from '@share/config-dialog/config-dialog.component';
import { Config } from 'ngx-countdown';
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
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  board: Board;
  players: IPlayer[];
  board_size: Size;
  player_list_size: Size;
  card_list_size: Size;
  material_list_size: Size;
  nobletile_list_size: Size;
  countdown_size: Size;
  configCountdown: Config
  get myStyles(): any {
    return {
      'width.px': this.material_list_size.width,
      'height.px': this.material_list_size.height,
      'background-color': 'green',
      'flex-direction': 'column',
      'justify-content': 'space-around',
      'align-items': 'center',
    };
  }
  constructor(
    private _userService: UserService,
    private _messageSV: MessageService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.configCountdown = {
      leftTime: 10 * 60,
      demand: false
    }
  }
  onStart() {
    this.counter.stop();
  }
  onFinished() {
    this.board.endUserTurn();
  }
  onResize() {
    let board_body = $('#board-body')
    if (board_body.width() > board_body.height()) {
      this.board_size = new Size(board_body.height() * 3 / 2, board_body.height()).subpadding(new Padding(5, 0));
      this.player_list_size = new Size(this.board_size.width * 0.3, this.board_size.height);
      this.material_list_size = new Size(this.board_size.width * 0.1, this.board_size.height * 0.5);
      this.nobletile_list_size = new Size(this.board_size.width * 0.1, this.board_size.height)
      this.card_list_size = new Size(this.board_size.width * 0.7, this.board_size.height);
      this.countdown_size = new Size(this.material_list_size.width);
    }
    return;
  }
  passTurn() {
    const dialogRef = this._dialog.open(ConfigDialogComponent, {
      data: {
        title: 'pass game',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.board.onActionOfUser('pass');
      }
    });
  }
  ngOnInit() {
    this.players = [this._userService.user, new AIPlayer(), new AIPlayer(), new AIPlayer()];
    this.board = new Board(this.players);
    this.board.eventBoardNotice.on((x: Message) => this.notice(x))
    this.board.eventRefundToken.on((data) => this.openModalrefundToken(data))
    this.board.eventEndGame.on((data) => this.openModalEndGame(data));
    this.board.eventNextPlayer.on((data) => this.nextPlayer());
    this.onResize()
  }
  nextPlayer() {
    this.counter.restart();
  }
  ngAfterViewInit() {

  }
  openModalEndGame(data) {
    const dialogRef = this._dialog.open(endGameDialog, {
      disableClose: true,
      data: { scoreList: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/home'])
    });
  }
  openModalrefundToken(data) {
    const dialogRef = this._dialog.open(RefundMaterialDialog, {
      width: 400 + "px",
      disableClose: true,
      data: { materials: this.board.currentPlayer.materials }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action({ action: 'refundToken', data: result })
    });
  }
  notice(message: Message) {
    this._messageSV.notice(message);
  }
  action($event: { action: string, data?: any }) {
    this.board.onActionOfUser($event.action, $event.data)
  }
  openModal() {
    const dialogRef = this._dialog.open(SetMaterialDialog, {
      width: 400 + "px",
      data: { materials: this.board.listToken.filter(x => x.token_id != 0) }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action({ action: 'setToken', data: result })
    });
  }
}
