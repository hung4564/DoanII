import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';
import { PlayerCompComponent } from './player-comp/player-comp.component';
import { MaterialModule } from './material.module';
import { CardCompComponent } from './card-comp/card-comp.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPipe } from '@pipes/pipe.module';
import { CountdownModule } from 'ngx-countdown';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';
@NgModule({
  declarations: [
    IconCompComponent,
    PlayerCompComponent,
    CardCompComponent,
    ConfigDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MainPipe,
    CountdownModule,
  ],
  exports: [
    IconCompComponent,
    PlayerCompComponent,
    CardCompComponent,
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MainPipe,
    CountdownModule,
    ConfigDialogComponent
  ],
  providers: [],
  entryComponents: [
    ConfigDialogComponent,
  ]
})
export class ShareModule { }
