import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FlipCountdownComponent } from '@share/countdown/countdown.component';
import { UserService } from '@services/user-service.service';
import { MessageService } from '@services/message.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Size, Padding } from '@model/Size';
import { PlayerDialog } from '../dialog/player-dialog.component';
import { ConfigDialogComponent } from '@share/config-dialog/config-dialog.component';
import { AIPlayer } from '@model/AIplayer';
import { Message } from '@model/message';
import { endGameDialog } from '../dialog/endgame.dialog.component';
import { RefundMaterialDialog, SetMaterialDialog } from '../dialog/material.dialog.component';
import { Board } from '@model/board';
import { Config } from 'ngx-countdown';
import { Helper } from '@model/helper';
import { CardDialog } from '../dialog/card.dialog.component';
import { Card } from '@model/card';
declare var $: any;
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class BoardComponent implements OnInit {
  @ViewChild(FlipCountdownComponent) counter: FlipCountdownComponent;
  @Input() board: Board;

  board_size: Size;
  player_list_size: Size;
  card_list_size: Size;
  material_list_size: Size;
  nobletile_list_size: Size;
  countdown_size: Size;
  button_size: Size;
  configCountdown: Config;
  get myStyles(): any {
    return {
      'flex-direction': 'column',
      'justify-content': 'space-around',
      'align-items': 'center',
    };
  }
  get buttonStyles() {
    return {
      'width.px': this.button_size.width,
      'height.px': this.button_size.height,
    }
  }
  constructor(
    private _userService: UserService,
    private _messageSV: MessageService,
    private _dialog: MatDialog,
    private _router: Router) {
    if (!!this.board) {
      this.board = new Board();
      this.board.listPlayer = [_userService.user, new AIPlayer()];
    }
  }
  onStart() {
    //this.counter.stop();
  }
  onFinished() {
    if (!this.board.isEndGame)
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
      this.button_size = new Size(this.countdown_size.width, this.countdown_size.width * 1 / 2).subpaddingNumber(5);
    }
    return;
  }
  openModalPlayer($event) {
    const dialogRef = this._dialog.open(PlayerDialog, {
      data: {
        player: this.board.listPlayer.find(x => x.id == $event.player_id)
      },
      panelClass: 'custom-matdialog',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.action({ action: 'buyHold', data: result.card })
      }
    });
  }
  openModalpassTurn() {
    const dialogRef = this._dialog.open(ConfigDialogComponent, {
      data: {
        title: 'pass',
      },
      panelClass: 'custom-matdialog',
    })
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      }
      else {
        this.board.onActionOfUser('pass');
      }
    });
  }
  ngOnInit() {
    this.configCountdown = {
      leftTime: this.board.config.timeOneTurn * 60,
      demand: false
    }
    this.settingBoard();
    this.onResize()
  }
  canAccess() {
    return this.board.currentPlayer.canAccess
  }
  settingBoard() {
    this.board.eventBoardNotice.on((x: Message) => this.notice(x))
    this.board.eventRefundToken.on((data) => this.openModalrefundToken(data))
    this.board.eventEndGame.on((data) => this.openModalEndGame(data));
    this.board.eventNextPlayer.on((data) => this.nextPlayer());
    this.board.settingGame();
  }
  nextPlayer() {
    this.counter.config.leftTime = this.board.config.timeOneTurn * 60;
    this.counter.restart();
  }
  ngAfterViewInit() {
    Helper.delay(2000).then(() => {
      this.board.startGame();
    })
  }
  openModalEndGame(data) {
    console.log(data);
    this.counter.stop();
    const dialogRef = this._dialog.open(endGameDialog, {
      disableClose: true,
      panelClass: 'custom-matdialog',
      data: { scoreList: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['/home'])
    });
  }
  openModalrefundToken(data) {
    const dialogRef = this._dialog.open(RefundMaterialDialog, {
      width: '50vw',
      panelClass: 'custom-matdialog',
      disableClose: true,
      data: { materials: this.board.currentPlayer.materials }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action({ action: 'refundToken', data: result })
    });
  }
  openModalCard(data: Card) {
    let canBuy: boolean = false;
    let canHold: boolean = false;
    this.board.currentPlayer.canBuy(data).then(result => {
      canBuy = result;
      this.board.currentPlayer.canHold().then(x => {
        canHold = x;
        const dialogRef = this._dialog.open(CardDialog, {
          width: '50vw',
          panelClass: 'custom-matdialog',
          data: {
            card: data,
            canAction: {
              buy: this.board.currentPlayer.canAccess && canBuy,
              hold: this.board.currentPlayer.canAccess && canHold,
            }
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.action({ action: result, data: data });
        });
      })
    })

  }
  notice(message: Message) {
    this._messageSV.notice(message);
  }
  action($event: { action: string, data?: any }) {
    this.board.onActionOfUser($event.action, $event.data)
  }
  openModal() {
    const dialogRef = this._dialog.open(SetMaterialDialog, {
      width: '50vw',
      panelClass: 'custom-matdialog',
      data: { materials: this.board.listToken.filter(x => x.token_id != 0) }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.action({ action: 'setToken', data: result })
    });
  }

}
