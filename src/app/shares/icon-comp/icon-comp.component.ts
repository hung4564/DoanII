import { Component, OnInit, Input } from '@angular/core';
import { Token } from '@model/token';
import { Size, Padding } from '@model/Size';
@Component({
  selector: 'icon-comp',
  templateUrl: './icon-comp.component.html',
  styleUrls: ['./icon-comp.component.css']
})
// % => hexa
// 100% — FF
// 95% — F2
// 90% — E6
// 85% — D9
// 80% — CC
// 75% — BF
// 70% — B3
// 65% — A6
// 60% — 99
// 55% — 8C
// 50% — 80
// 45% — 73
// 40% — 66
// 35% — 59
// 30% — 4D
// 25% — 40
// 20% — 33
// 15% — 26
// 10% — 1A
// 5% — 0D
// 0% — 00
export class IconCompComponent implements OnInit {
  @Input() token: Token
  @Input('size-comp') size: Size;
  src: string;
  img_size: Size;
  padding: Padding;
  constructor() {
  }
  get containerStyle() {
    return {
      'color': '#' + this.token.color + 'CC',
      'background-color': '#' + this.token.color + '33',
      'border': 'solid 2px',
      'width.px': this.size.width,
      'height.px': this.size.height,
      'padding.px': this.padding.padding_top
    }
  }
  ngOnInit() {
    this.padding = new Padding(Math.round(this.size.width / 6));
    this.img_size = this.size.subpadding(this.padding).subpadding(new Padding(2));
    this.src = 'assets/icon/' + this.token.imgInfo.type + '/' + this.token.imgInfo.name + '-96.png';
  }

}
