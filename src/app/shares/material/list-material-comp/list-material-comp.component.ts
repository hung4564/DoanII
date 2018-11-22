import { Component, OnInit, Input, Inject, ElementRef, Output, EventEmitter } from '@angular/core';
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
  @Input() materials: { count: number, token_id: number }[];
  player_size: Size;
  token_size: Size;
  @Output() action = new EventEmitter<any>();
  get myStyles(): any {
    return {
      'width.px': this.size.width,
      'height.px': this.size.height,
      'background-color': 'green'
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
  openModal() {
    const dialogRef = this.dialog.open(ListMaterialDialog, {
      width: 400 + "px",
      data: { materials: this.materials.filter(x => x.token_id != 0) }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getToken(result);
    });
  }
  getToken(tokenList: { count: number, token_id: number }[]) {
    this.action.next(tokenList);
  }

}
export interface DialogMaterialData {
  materials: { count: number, token_id: number }[];
}
@Component({
  selector: 'list-material-dialog',
  templateUrl: 'list-material.dialog.html',
})
export class ListMaterialDialog implements OnInit {
  materials: { count: number, token_id: number }[];
  get_materials: { count: number, token_id: number }[];
  token_size: Size;
  constructor(
    public dialogRef: MatDialogRef<ListMaterialDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMaterialData,
    private el: ElementRef) {
    this.materials = JSON.parse(JSON.stringify(data.materials));
  }
  ngOnInit() {
    this.get_materials = [];
    this.materials.forEach(x => {
      this.get_materials.push({ count: 0, token_id: x.token_id })
    })
    this.token_size = new Size(400 / 7);
  }
  canSelect(token_id: number) {
    let token = this.materials.find(x => x.token_id == token_id);
    return token.count > 0
  }
  selectToken(token_id: number) {
    let canSelect: boolean = true;
    //neu so luong token chon chua lon hon 3;
    let count = this.get_materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (count >= 3) {
      return;
    }
    if (count == 2 && this.get_materials.find(x => x.token_id == token_id).count > 0) {
      return;
    }
    if (this.get_materials.some(x => x.count >= 2)) {
      return;
    }
    if (canSelect) {
      this.materials.find(x => x.token_id == token_id).count--;
      this.get_materials.find(x => x.token_id == token_id).count++;
    }
  }
  unselectToken(token_id: number) {
    let token = this.materials.find(x => x.token_id == token_id);
    if (token) {
      token.count++;
    }
    token = this.get_materials.find(x => x.token_id == token_id);
    if (token) {
      token.count--;
    }
  }
  getToken() {
    let count = this.get_materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (count < 2 || count > 3) {
      return;
    }
    this.dialogRef.close(this.get_materials.filter(x => x.count > 0))
  }
}