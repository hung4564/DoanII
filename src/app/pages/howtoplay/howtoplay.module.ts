import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowtoplayComponent } from './howtoplay.component';
import { ShareModule } from '@share/shares.module';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [HowtoplayComponent]
})
export class HowtoplayModule { }
