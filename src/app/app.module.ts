import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainModule } from './layouts/mainlayout/main.module';
import { ShareModule } from './shares/shares.module'
import { AppRoutingModule } from './app-routing.module'
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ShareModule,
    MainModule,
    RouterModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  exports: [ModalModule]
})
export class AppModule { }
