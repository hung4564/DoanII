import { } from '@angular/material';
import { NgModule } from '@angular/core';
import * as Material from '@angular/material';
@NgModule({
  imports: [
    Material.MatDialogModule,
    Material.MatFormFieldModule,
  ],
  exports: [
    Material.MatDialogModule,
    Material.MatFormFieldModule,
  ],
})
export class MaterialModule { }