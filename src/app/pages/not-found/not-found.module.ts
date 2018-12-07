import { NgModule } from '@angular/core';
import { ShareModule } from '../../shares/shares.module'
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
