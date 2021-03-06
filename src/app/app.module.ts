import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainModule } from './layouts/mainlayout/main.module';
import { ShareModule } from './shares/shares.module'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user-service.service';
import { MessageService } from './services/message.service';
import { TranslateService } from './services/translate.service';
import { MarkdownModule } from 'ngx-markdown';
import { BackendService } from './services/backend.service';
import { HttpClient } from '@angular/common/http';
export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ShareModule,
    MainModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    UserService,
    MessageService,
    BackendService,
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
