import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';
import { ListPlayerCompComponent } from './player/list-player-comp/list-player-comp.component';
import { PlayerCompComponent } from './player/player-comp/player-comp.component';
import { MaterialModule } from './material.module';
import { CardCompComponent } from './card/card-comp/card-comp.component';
import { ListCardCompComponent, CardDialog } from './card/list-card-comp/list-card-comp.component'
import { FormsModule } from '@angular/forms';
import { ListMaterialCompComponent, ListMaterialDialog } from './material/list-material-comp/list-material-comp.component';
@NgModule({
  declarations: [
    IconCompComponent,
    PlayerCompComponent,
    ListPlayerCompComponent,
    CardCompComponent,
    ListCardCompComponent,
    CardDialog,
    ListMaterialCompComponent,
    ListMaterialDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    IconCompComponent,
    PlayerCompComponent,
    ListPlayerCompComponent,
    CardCompComponent,
    ListCardCompComponent,
    CardDialog,
    ListMaterialCompComponent,
    ListMaterialDialog,
    BrowserModule
  ],
  entryComponents: [
    CardDialog,
    ListMaterialDialog,
  ],
  providers: [],
})
export class ShareModule { }
