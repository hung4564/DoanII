import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '@share/shares.module';
import { CardCompComponent } from './card-comp/card-comp.component'
import { MaterialModule } from '@share/material.module';
import { PlayerCompComponent } from './player-comp/player-comp.component';
@NgModule({
  imports: [
    ShareModule,
    MaterialModule
  ],
  declarations: [
    PlayBoardComponent,
    CardCompComponent,
    PlayerCompComponent
  ]
})
export class PlayBoardModule { }
