import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '@share/shares.module';
import { ListPlayerCompComponent } from './list-player-comp/list-player-comp.component';
import { ListCardCompComponent, CardDialog } from './list-card-comp/list-card-comp.component'

import { ListMaterialCompComponent, } from './list-material-comp/list-material-comp.component';
import { ListNobletileComponent } from './list-nobletile-comp/list-nobletile.component';
import { SetMaterialDialog, RefundMaterialDialog } from './dialog/material.dialog.component';
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
    SetMaterialDialog,
    RefundMaterialDialog,
    ListNobletileComponent,
  ],
  entryComponents: [
    CardDialog,
    SetMaterialDialog,
    RefundMaterialDialog,
  ],
})
export class PlayBoardModule { }
