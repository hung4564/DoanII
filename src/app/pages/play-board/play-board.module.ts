import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '@share/shares.module';
import { ListPlayerCompComponent } from './list-player-comp/list-player-comp.component';
import { ListCardCompComponent, CardDialog } from './list-card-comp/list-card-comp.component'

import { ListMaterialCompComponent, ListMaterialDialog } from './list-material-comp/list-material-comp.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [
    PlayBoardComponent,
    ListPlayerCompComponent,
    ListCardCompComponent,
    ListMaterialCompComponent,
    CardDialog,
    ListMaterialDialog,
  ],
  entryComponents: [
    CardDialog,
    ListMaterialDialog,
  ],
})
export class PlayBoardModule { }
