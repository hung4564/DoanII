import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardConfig } from '@model/board';
import { IPlayer } from '@model/iplayer';
import { UserPlayer } from '@model/Userplayer';
import { TypePlayer } from '@model/iplayer';
import { AIPlayer } from '@model/AIplayer';
import { UserService } from '@services/user-service.service';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isError: boolean;
  constructor(isError: boolean = false) {
    this.isError = isError
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched)) || this.isError;
  }
}
@Component({
  selector: 'setting-board',
  templateUrl: './setting-board.component.html',
  styleUrls: ['./setting-board.component.css']
})
export class SettingBoardComponent implements OnInit {
  checkError = new MyErrorStateMatcher(false);
  @Input('data') data: BoardConfig;
  @Output() submit = new EventEmitter();
  settingForm: FormGroup;
  items: FormArray;
  array = [0, 1, 2, 3, 4];
  game_speeds = [5, 10, 15]
  target_score = [15, 21]
  orderList: { order: number, player: IPlayer, type: TypePlayer }[] = [];
  get canSubmit(): boolean {
    for (let i = 0; i < this.data.maxPlayer; i++) {
      if (this.settingForm.invalid) {
        return false
      }
      if (this.orderList.filter(x => x.order == i).length > 1) {
        return false;
      }
    }
    return true;
  }
  constructor(_userSV: UserService, private _formBuilder: FormBuilder) {
    this.orderList[0] = { order: 1, player: _userSV.user, type: TypePlayer.UserPlayer };

  }
  getErrorMessage(form: FormGroup) {
    if (form.hasError('required')) return 'You must enter a value';
  }
  createItem(item: { order: number, player: IPlayer, type: TypePlayer }): FormGroup {
    return this._formBuilder.group({
      name: [item.player.name, Validators.required],
      order: [item.order, Validators.required],
      type: [item.type]
    });
  }
  addItem(item: { order: number, player: IPlayer, type: TypePlayer }): void {
    this.items = this.settingForm.get('items') as FormArray;
    this.items.push(this.createItem(item));
  }

  selectMaxPlayerChanger($event) {
    this.orderList.splice(1);
    this.data.maxCpus = 0;
    this.data.maxPlayer = $event.value;
    this.updateListPlayer();
  }
  selectCpuChanger($event) {
    (this.settingForm.controls.items as FormArray).controls[0].invalid
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
    let listForm = (this.settingForm.get('items') as FormArray)
    while (listForm.length > 1) {
      listForm.removeAt(listForm.length - 1);
    }
    for (let i = 1; i < this.data.maxPlayer; i++) {
      this.addItem(this.orderList[i]);
    }

  }
  check(order) {
    let check = this.orderList.filter(x => x.order == order).length > 1;
    return check;
  }
  ngOnInit() {
    this.settingForm = this._formBuilder.group({
      selectMaxPlayer: [this.data.maxPlayer, Validators.required],
      selectMaxCpu: [this.data.maxCpus, Validators.required],
      selectTimeOneTurn: [this.data.timeOneTurn, Validators.required],
      selectScore: [this.data.maxPointWin, Validators.required],
      items: this._formBuilder.array([this.createItem(this.orderList[0])], Validators.required)
    });
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
    if (this.settingForm.invalid || !this.canSubmit) {
      return;
    }
    for (let i = 0; i < this.data.maxPlayer; i++) {
      if (this.orderList.filter(x => x.order == i).length > 1) {
        return;
      }
    }
    this.submit.emit({
      orderList: this.orderList,
      BoardConfig: this.data,
    })
  }
  selectOrderChange($event) {
    let check = this.orderList.filter(x => x.order == $event.value).length > 1;
    this.checkError.isError = check;
  }
}