import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';

@NgModule({
  declarations: [
    IconCompComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports:[
    IconCompComponent,
    BrowserModule
  ],
  providers: [],
})
export class ShareModule { }
