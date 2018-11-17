import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '@share/shares.module';
import { MaterialModule } from '@share/material.module';

@NgModule({
  imports: [
    ShareModule,
    MaterialModule
  ],
  declarations: [
    PlayBoardComponent,
  ]
})
export class PlayBoardModule { }
