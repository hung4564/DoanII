import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { Size } from '@model/Size';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  @Input() materials: { count: number, token_id: number };
  player_size: Size;
  token_size: Size;
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': 'green'
    };
  }
  constructor(private dialog: MatDialog) { }
  onResize() {
    this.token_size = new Size(this.size.width * 0.5);
  }
  ngOnInit() {
    this.onResize();
  }
  openModal() {
    const dialogRef = this.dialog.open(ListMaterialDialog, {
      width: 400 + "px",
      data: { materials: this.materials.filter(x => x.token_id != 0) }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
export interface DialogMaterialData {
  materials: { count: number, token_id: number };
}
@Component({
  selector: 'list-material-dialog',
  templateUrl: 'list-material.dialog.html',
})
export class ListMaterialDialog implements OnInit {
  materials: { count: number, token_id: number };
  token_size: Size;
  constructor(
    public dialogRef: MatDialogRef<ListMaterialDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMaterialData,
    private el: ElementRef) {
    this.materials = data.materials
  }
  ngOnInit() {

    console.log(this.el.nativeElement.width)
    this.token_size = new Size(400 / 7);
  }

}