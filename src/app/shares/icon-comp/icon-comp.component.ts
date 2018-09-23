import { Component, OnInit, Input } from '@angular/core';
import { Token } from '@model/token';
@Component({
  selector: 'icon-comp',
  templateUrl: './icon-comp.component.html',
  styleUrls: ['./icon-comp.component.css']
})
export class IconCompComponent implements OnInit {
  @Input() token: Token
  @Input() size;
  src: string;
  constructor() { }

  ngOnInit() {
    console.log('#' + this.token.color + ":" + '#' + '80' + this.token.color);
    this.src = 'assets/icon/' + this.token.imgInfo.type + '/' + this.token.imgInfo.name + '-96.png';
  }

}
