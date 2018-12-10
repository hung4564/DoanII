
import { NgModule } from '@angular/core';
import { MainlayoutComponent } from './mainlayout.component';
import { HeaderlayoutComponent } from '../partials/headerlayout/headerlayout.component'
import { MainRoutingModule } from './main.routing'
import { ShareModule } from '@share/shares.module'
import { HomeModule } from '@pages/home/home.module'
import { PlayBoardModule } from '@pages/play-board/play-board.module'
import { NotFoundModule } from '@pages/not-found/not-found.module';
import { AboutModule } from '@pages/about/about.module';
import { HowtoplayModule } from '@pages/howtoplay/howtoplay.module';
@NgModule({
  declarations: [
    MainlayoutComponent,
    HeaderlayoutComponent,
  ],
  imports: [
    ShareModule,
    MainRoutingModule,
    HomeModule,
    PlayBoardModule,
    NotFoundModule,
    AboutModule,
    HowtoplayModule
  ],
  providers: [],
})
export class MainModule { }
