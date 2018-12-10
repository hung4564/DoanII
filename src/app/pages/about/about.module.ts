import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { ShareModule } from '@share/shares.module';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
