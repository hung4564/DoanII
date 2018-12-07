import { } from '@angular/material';
import { NgModule } from '@angular/core';
import * as Material from '@angular/material';
@NgModule({
  exports: [
    Material.MatDialogModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatIconModule,
    Material.MatButtonModule,
  ],
})
export class MaterialModule { }