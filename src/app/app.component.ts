import { Component } from '@angular/core';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from '@pipes/translate.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _translateSv: TranslateService) {
  }
  setLang(lang: string) {
    this._translateSv.use(lang);
  }
}
