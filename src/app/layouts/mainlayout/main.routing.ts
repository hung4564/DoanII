import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from './mainlayout.component';
import { Homeroutes } from '@pages/home/home.route';
import { PlayBoardroutes } from '@pages/play-board/play-board.route';
import { NotFoundroutes } from '@pages/not-found/not-found.route';
const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      ...Homeroutes,
      ...PlayBoardroutes,
      ...NotFoundroutes,
      {
        path: '**',
        redirectTo: '/not-found'
      },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }