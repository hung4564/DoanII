import { Component, OnInit, Input, Inject, ElementRef, Output, EventEmitter } from '@angular/core';
import { Size } from '@model/Size';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListToken } from '@model/token';

@Component({
  selector: 'list-material-comp',
  templateUrl: './list-material-comp.component.html',
  styleUrls: ['./list-material-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
})
export class ListMaterialCompComponent implements OnInit {
  @Input('size-comp') size: Size;
  @Input() materials: ListToken[];
  player_size: Size;
  token_size: Size;
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'flex-direction': 'column',
      'justify-content': 'space-around',
      'align-items': 'center',
    };
  }
  constructor(private dialog: MatDialog) {

  }
  onResize() {
    this.token_size = new Size(this.size.width * 0.5);
  }
  ngOnInit() {

    this.onResize();
  }

}
