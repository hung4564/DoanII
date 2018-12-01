import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardConfig } from '@model/board';
import { IPlayer } from '@model/iplayer';
import { UserPlayer } from '@model/Userplayer';
import { TypePlayer } from '@model/iplayer';
import { AIPlayer } from '@model/AIplayer';
import { UserService } from '@services/user-service.service';

@Component({
  selector: 'setting-board',
  templateUrl: './setting-board.component.html',
  styleUrls: ['./setting-board.component.css']
})
export class SettingBoardComponent implements OnInit {

  @Input('data') data: BoardConfig;
  @Output() submit = new EventEmitter();
  array = [0, 1, 2, 3, 4];
  game_speeds = [{ value: 15, text: '15 mins' }, { value: 10, text: '10 mins' }, { value: 5, text: '5 mins' }]
  target_score = [{ value: 15, text: '15' }, { value: 21, text: '21' }]
  orderList: { order: number, player: IPlayer, type: TypePlayer }[] = [];
  constructor(_userSV: UserService) {
    this.orderList[0] = { order: 1, player: _userSV.user, type: TypePlayer.UserPlayer };
  }
  selectMaxPlayerChanger($event) {
    this.orderList.splice(1);
    this.data.maxPlayer = $event.value;
    this.data.maxCpus = 0;
    this.updateListPlayer();
  }
  selectCpuChanger($event) {
    this.data.maxCpus = $event.value;
    if (this.data.maxCpus > this.data.maxPlayer) {
      return
    }
    this.updateListPlayer();

  }
  updateListPlayer() {
    for (let i = 0; i < this.data.maxCpus; i++) {
      this.orderList[this.data.maxPlayer - i - 1] = { order: this.data.maxPlayer - i, player: new AIPlayer('CPU Player ' + (this.data.maxPlayer - i)), type: TypePlayer.AiPlayer };
    }
    for (let i = 1; i < this.data.maxPlayer - this.data.maxCpus; i++) {
      this.orderList[i] = { order: i + 1, player: new UserPlayer('User Player ' + (i + 1)), type: TypePlayer.UserPlayer };
    }

  }
  ngOnInit() {
    this.updateListPlayer();
  }
  setClass(type: TypePlayer) {
    switch (type) {
      case TypePlayer.AiPlayer:
        return 'fa-desktop';
        break;

      case TypePlayer.UserPlayer:
        return 'fa-user';
        break;
    }
  }
  Submit() {
    this.submit.emit({
      orderList: this.orderList,
      BoardConfig: this.data,
    })
  }
}
