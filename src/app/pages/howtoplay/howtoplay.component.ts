import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '@services/backend.service';
import { TranslateService } from '@services/translate.service';

@Component({
  selector: 'app-howtoplay',
  templateUrl: './howtoplay.component.html',
  styleUrls: ['./howtoplay.component.css']
})
export class HowtoplayComponent implements OnInit {
  constructor(public router: Router, private _backendSV: BackendService, private _transSV: TranslateService) { }
  content: any;
  ngOnInit() {
    let url = './assets/lang/' + this._transSV.lang + '.howtoplay.md'
    this._backendSV.getText(url).subscribe(
      res => {
        this.content = res;
      },
      err => {
        console.log(err);
      })
  }
  home() {
    this.router.navigate(['/home'])
  }

}
