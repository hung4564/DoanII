import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';
import { ListPlayerCompComponent } from './player/list-player-comp/list-player-comp.component';
import { PlayerCompComponent } from './player/player-comp/player-comp.component';

import { CardCompComponent } from './card/card-comp/card-comp.component';
import { ListCardCompComponent } from './card/list-card-comp/list-card-comp.component'
@NgModule({
  declarations: [
    IconCompComponent,
    PlayerCompComponent,
    ListPlayerCompComponent,
    CardCompComponent,
    ListCardCompComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    IconCompComponent,
    PlayerCompComponent,
    ListPlayerCompComponent,
    CardCompComponent,
    ListCardCompComponent,
    BrowserModule
  ],
  providers: [],
})
export class ShareModule { }
