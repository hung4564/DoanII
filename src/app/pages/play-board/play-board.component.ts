import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from '@model/board';
import { UserService } from 'app/services/user-service.service';
import { MessageService } from 'app/services/message.service';
import { MatDialog } from '@angular/material';
import { Route, Router } from '@angular/router';
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
    let list = $event.orderList.sort((x, y) => { return x.order - y.order }).map(x => x.player);
    this.board.listPlayer = list;
  }

  ngOnInit() {
  }
}
