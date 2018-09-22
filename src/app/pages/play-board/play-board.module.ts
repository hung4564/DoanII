import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '../../shares/shares.module';
import { CardCompComponent } from './card-comp/card-comp.component'

@NgModule({
  imports: [
    ShareModule,
  ],
  declarations: [
    PlayBoardComponent,
    CardCompComponent
  ]
})
export class PlayBoardModule { }
