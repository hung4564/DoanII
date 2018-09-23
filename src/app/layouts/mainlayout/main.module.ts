
import { NgModule } from '@angular/core';
import { MainlayoutComponent } from './mainlayout.component';
import { HeaderlayoutComponent } from '../partials/headerlayout/headerlayout.component'
import { MainRoutingModule } from './main.routing'
import { ShareModule } from '../../shares/shares.module'
import { HomeModule } from '../../pages/home/home.module'
import { PlayBoardModule } from '../../pages/play-board/play-board.module'

@NgModule({
  declarations: [
    MainlayoutComponent,
    HeaderlayoutComponent,
  ],
  imports: [
    ShareModule,
    MainRoutingModule,
    HomeModule,
    PlayBoardModule
  ],
  providers: [],
})
export class MainModule { }
