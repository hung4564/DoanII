import { Component, OnInit, Inject, ElementRef } from "@angular/core";

import { Size } from "@model/Size";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ListToken } from "@model/token";

export interface IMaterialDialog {
  text: String;
  materials: ListToken[];
  get_materials: ListToken[];
  canSelectToken(token_id: number);
  selectToken(token_id: number);
  unSelectToken(token_id: number);
  getToken();
}

@Component({
  selector: 'set-material-dialog',
  templateUrl: 'material.dialog.html',
})
export class SetMaterialDialog implements OnInit, IMaterialDialog {
  text: string = 'Take 3 different colored tokens or 2 tokens of the same color'
  materials: ListToken[];
  get_materials: ListToken[];
  token_size: Size;
  constructor(
    public dialogRef: MatDialogRef<SetMaterialDialog>,
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
  canSelectToken(token_id: number) {
    let token = this.materials.find(x => x.token_id == token_id);
    let count = this.get_materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (token.count <= 0) {
      return false;
    }
    if (token.count < 4 && this.get_materials.find(x => x.token_id == token_id).count > 0) {
      return false;
    }
    if (count == 2 && this.get_materials.some(x => x.count == 2)) {
      return false;
    }
    if (count >= 3) {
      return false;
    }
    return true;
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
  unSelectToken(token_id: number) {
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

@Component({
  selector: 'refund-material-dialog',
  templateUrl: 'material.dialog.html',
})
export class RefundMaterialDialog implements OnInit, IMaterialDialog {
  get text(): string {
    return 'returns' + (this.materials.map(item => item.count).reduce((prev, next) => prev + next) - 10) + 'tokens'
  }
  materials: ListToken[];
  get_materials: ListToken[];
  token_size: Size;
  constructor(
    public dialogRef: MatDialogRef<RefundMaterialDialog>,
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
  canSelectToken(token_id: number) {
    let token = this.materials.find(x => x.token_id == token_id);
    let count = this.materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (token.count <= 0) {
      return false;
    }
    if (count <= 10) {
      return false;
    }
    return true;
  }
  selectToken(token_id: number) {
    let canSelect: boolean = true;
    if (canSelect) {
      this.materials.find(x => x.token_id == token_id).count--;
      this.get_materials.find(x => x.token_id == token_id).count++;
    }
  }
  unSelectToken(token_id: number) {
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
    let count = this.materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (count > 10) {
      return;
    }
    this.dialogRef.close(this.get_materials.filter(x => x.count > 0))
  }
}
export interface DialogMaterialData {
  materials: ListToken[];
}