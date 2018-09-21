import { NgModule } from '@angular/core';
import { ShareModule } from '../../shares/shares.module'
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
