import { Component, OnInit, Input, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.css'],
  host: {
  }
})
export class ConfigDialogComponent {
  content: DialoglData
  constructor(
    public dialogRef: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialoglData,
    private el: ElementRef) {
    this.content = data;
  }

}

interface DialoglData {
  tile: string;
}