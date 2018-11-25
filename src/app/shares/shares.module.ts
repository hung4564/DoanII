import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';
import { PlayerCompComponent } from './player-comp/player-comp.component';
import { MaterialModule } from './material.module';
import { CardCompComponent } from './card-comp/card-comp.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    IconCompComponent,
    PlayerCompComponent,
    CardCompComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    IconCompComponent,
    PlayerCompComponent,
    CardCompComponent,
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
})
export class ShareModule { }
