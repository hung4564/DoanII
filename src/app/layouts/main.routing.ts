import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from './mainlayout/mainlayout.component'
const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [

    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class MainRoutingModule { }