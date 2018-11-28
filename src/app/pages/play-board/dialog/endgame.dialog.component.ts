import { Component, OnInit, Inject, ElementRef } from "@angular/core";

import { Size } from "@model/Size";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
  selector: 'set-endGame-dialog',
  templateUrl: 'endgame.dialog.html'
})
export class endGameDialog implements OnInit {
  public scoreList: { player_id: number, point: number }[];
  constructor(
    public dialogRef: MatDialogRef<DialogEndGameData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEndGameData,
    private el: ElementRef) {
    this.scoreList = JSON.parse(JSON.stringify(data.scoreList));
  }
  ngOnInit() {
  }
  getType(level: number) {
    switch (level) {
      case 0:
        return 'Winner';
      case 1:
        return '2th';
      case 2:
        return '3th';
      case 3:
        return '4th';
      default:
        break;
    }
  }
  getSize(level){
    switch (level) {
      case 0:
        return 'xx-large';
      case 1:
        return 'x-large';
      case 2:
        return 'large';
      case 3:
      default:
        break;
    }
  }

}
export interface DialogEndGameData {
  scoreList: { player_id: number, name: string, point: number }[];
}