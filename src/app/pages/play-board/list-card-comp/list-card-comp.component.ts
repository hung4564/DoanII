import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Size, Padding } from '@model/Size';
import { Card } from '@model/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fadeInRightBigOnEnterAnimation, fadeOutLeftBigOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'list-card-comp',
  templateUrl: './list-card-comp.component.html',
  styleUrls: ['./list-card-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  },
  animations: [
    fadeInRightBigOnEnterAnimation(),
    fadeOutLeftBigOnLeaveAnimation()
  ]
})
export class ListCardCompComponent implements OnInit {
  @Input('cards') cards: Card[][];
  @Input('size-comp') size: Size;
  @Output() clickCard = new EventEmitter<Card>();
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
      'background-color': '#' + 'c0392b' + 'CC',
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
    this.clickCard.next(card);
   
  }

}
