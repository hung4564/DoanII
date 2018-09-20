import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainModule } from './layouts/main.module';
import { ShareModule } from './shares/shares.module'
import { AppRoutingModule } from './app-routing.module'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ShareModule,
    MainModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
