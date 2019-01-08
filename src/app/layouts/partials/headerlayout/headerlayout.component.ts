import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@services/translate.service';

@Component({
  selector: 'header-layout',
  templateUrl: './headerlayout.component.html',
  styleUrls: ['./headerlayout.component.css']
})
export class HeaderlayoutComponent implements OnInit {
  lang = "en";
  link = "https://github.com/hung4564/DoanII";
  constructor(private _translate: TranslateService) { }

  ngOnInit() {
  }
  changeLang(lang: string) {
    this._translate.use(lang);
  }
}
