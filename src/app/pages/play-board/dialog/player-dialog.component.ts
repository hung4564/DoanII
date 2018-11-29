import { Component, OnInit, Inject, ElementRef } from "@angular/core";

import { Size } from "@model/Size";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IPlayer } from "@model/iplayer";
import { Card } from "@model/card";


@Component({
  selector: 'set-Player-dialog',
  templateUrl: 'player-dialog.html'
})
export class PlayerDialog implements OnInit {
  public player: IPlayer;
  constructor(
    public dialogRef: MatDialogRef<DialogPlayerData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPlayerData,
    private el: ElementRef) {
  }
  card_size: Size
  token_size: Size;
  ngOnInit() {
    this.token_size = new Size(40);
    this.card_size = new Size(80);
    this.player = this.data.player;
  }
  buyHoldCard(card) {
    this.dialogRef.close({ card: card });
  }

}
export interface DialogPlayerData {
  player: IPlayer;
}