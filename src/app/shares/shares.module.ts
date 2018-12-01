import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IconCompComponent } from './icon-comp/icon-comp.component';
import { PlayerCompComponent } from './player-comp/player-comp.component';
import { MaterialModule } from './material.module';
import { CardCompComponent } from './card-comp/card-comp.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPipe } from '@pipes/pipe.module';
import { CountdownModule } from 'ngx-countdown';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';
import { FlipCountdownComponent } from './countdown/countdown.component';
@NgModule({
  declarations: [
    IconCompComponent,
    PlayerCompComponent,
    CardCompComponent,
    ConfigDialogComponent,
    FlipCountdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    MainPipe,
    CountdownModule,
    ReactiveFormsModule
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
    ConfigDialogComponent,
    FlipCountdownComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  entryComponents: [
    ConfigDialogComponent,
  ]
})
export class ShareModule { }
