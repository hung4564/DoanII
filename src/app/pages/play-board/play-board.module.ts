import { NgModule } from '@angular/core';
import { PlayBoardComponent } from './play-board.component';
import { ShareModule } from '@share/shares.module';
import { ListPlayerCompComponent } from './list-player-comp/list-player-comp.component';
import { ListCardCompComponent, } from './list-card-comp/list-card-comp.component'

import { ListMaterialCompComponent, } from './list-material-comp/list-material-comp.component';
import { ListNobletileComponent } from './list-nobletile-comp/list-nobletile.component';
import { SetMaterialDialog, RefundMaterialDialog } from './dialog/material.dialog.component';
import { endGameDialog } from './dialog/endgame.dialog.component';
import { PlayerDialog } from './dialog/player-dialog.component';
import { CardDialog } from './dialog/card.dialog.component';
import { SettingBoardComponent } from './setting-board/setting-board.component';
import { BoardComponent } from './board/board.component';
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
    endGameDialog,
    PlayerDialog,
    SettingBoardComponent,
    BoardComponent
  ],
  entryComponents: [
    CardDialog,
    SetMaterialDialog,
    RefundMaterialDialog,
    endGameDialog,
    PlayerDialog
  ],
})
export class PlayBoardModule { }
