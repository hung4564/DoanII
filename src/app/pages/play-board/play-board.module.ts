import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '../../shares/shares.module'

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [PlayBoardComponent]
})
export class PlayBoardModule { }
