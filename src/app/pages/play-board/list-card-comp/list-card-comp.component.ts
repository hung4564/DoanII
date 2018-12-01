import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Size, Padding } from '@model/Size';
import { Card } from '@model/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  card: Card;
}
@Component({
  selector: 'list-card-comp',
  templateUrl: './list-card-comp.component.html',
  styleUrls: ['./list-card-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class ListCardCompComponent implements OnInit {
  @Input('cards') cards: Card[][];
  @Input('size-comp') size: Size;
  @Output() action = new EventEmitter<any>();
  card_size: Size;
  list_card_size: Size;
  constructor(private dialog: MatDialog) { }
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
    };
  }
  get listCardStyles() {
    return {
      'width.px': this.list_card_size.width,
      'height.px': this.list_card_size.height,
      'padding': this.padding.toStringPx()
    }
  }
  get cardSetStyles() {
    return {
      'width.px': this.card_size.height / 3 * 2 / 3,
      'height.px': this.card_size.height / 3,
      'font-size.px': this.card_size.height / 9,
      'background-color': 'red'
    }
  }
  padding: Padding = new Padding(5, 0);
  onResize() {
    this.list_card_size = new Size(this.size.width, this.size.height / 3).subpadding(this.padding);
    this.card_size = new Size(this.list_card_size.width / 4, this.list_card_size.height).subpadding(this.padding);
  }
  ngOnInit() {
    this.onResize();
  }
  click_card(card: Card) {
    const dialogRef = this.dialog.open(CardDialog, {
      width: 400 + "px",
      data: { card: card }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cardAction(result, card);
    });
  }
  cardAction(action: string, card: Card) {
    this.action.next({ action: action, data: card });
  }

}

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
    this.card_size = new Size(250);
  }

}