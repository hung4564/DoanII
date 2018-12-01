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
import { FlipCountdownComponent } from '@share/countdown/countdown.component';
import { ConfigDialogComponent } from '@share/config-dialog/config-dialog.component';
import { Config } from 'ngx-countdown';
import { PlayerDialog } from './dialog/player-dialog.component';
declare var $: any;
@Component({
  selector: 'app-play-board',
  templateUrl: './play-board.component.html',
  styleUrls: ['./play-board.component.css']
})

export class PlayBoardComponent implements OnInit {
  board: Board;
  isSetting: boolean = true;

  constructor(
    private _userService: UserService,
    private _messageSV: MessageService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.board = new Board();
  }
  submitSetting($event) {
    this.isSetting = false;
    this.board.config = $event.BoardConfig;
    let list = $event.orderList.sort((x, y) => { return y.order < x.order })
    let listAdd: IPlayer[] = []
    list.forEach((element, index) => {
      listAdd[index] = element.player;
    });
    this.board.listPlayer = listAdd;
    this.board.startGame();
  }

  ngOnInit() {
  }
}
