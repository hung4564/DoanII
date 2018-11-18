
import { Routes } from '@angular/router';
import { PlayBoardComponent } from './play-board.component';
import { PlayboardGuard } from './playboard.guard';
export const PlayBoardroutes: Routes = [
  {
    path: 'play',
    canActivate: [PlayboardGuard],
    component: PlayBoardComponent
  }
];