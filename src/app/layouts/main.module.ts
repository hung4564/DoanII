import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { HeaderlayoutComponent } from './headerlayout/headerlayout.component'
import { MainRoutingModule } from './main.routing'
@NgModule({
  declarations: [
    MainlayoutComponent,
    HeaderlayoutComponent,
  ],
  imports: [
    BrowserModule,
    
    MainRoutingModule
  ],
  providers: [],
})
export class MainModule { }
