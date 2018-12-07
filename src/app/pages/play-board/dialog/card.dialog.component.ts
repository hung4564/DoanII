import { Component, OnInit, Inject, ElementRef } from "@angular/core";

import { Size } from "@model/Size";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Card } from "@model/card";

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'card-dialog.html',
})
export class CardDialog {
  card: Card
  card_size: Size;
  constructor(
    public dialogRef: MatDialogRef<CardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.card = data.card;
    this.card_size = new Size(240);
    console.log(data);
  }

}
export interface DialogData {
  card: Card;
  canAction: { buy: boolean, hold: boolean }
}