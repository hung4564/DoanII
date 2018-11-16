import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';
import { ListPlayerCompComponent } from './player/list-player-comp/list-player-comp.component';
import { PlayerCompComponent } from './player/player-comp/player-comp.component';
@NgModule({
  declarations: [
    IconCompComponent,
    PlayerCompComponent,
    ListPlayerCompComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    IconCompComponent,
    PlayerCompComponent,
    ListPlayerCompComponent,
    BrowserModule
  ],
  providers: [],
})
export class ShareModule { }
