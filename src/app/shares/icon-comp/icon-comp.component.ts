import { Component, OnInit, Input } from '@angular/core';
import { Token } from '@model/token';
import { Size, Padding } from '@model/Size';
import { materials } from '@data/token';
@Component({
  selector: 'icon-comp',
  templateUrl: './icon-comp.component.html',
  styleUrls: ['./icon-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  }
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
  @Input() token: Token;
  @Input() token_id: number = -1;
  @Input('size-comp') size: Size;
  @Input() count: number;
  @Input() center: string = "token";
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
      'padding.px': this.padding.padding_top,
      'margin-left.px': this.padding.padding_left,
      'position': 'relative',
    }
  }
  get countStyles() {
    return {
      'font-size.px': this.size.height * 2 / 3,
      'bottom.px': this.center === "token" ? '-' + this.size.width * 1 / 3 : 0,
      'position': 'absolute',
      'top': this.center === "token" ? 'unset' : '50%',
      'left': this.center === "token" ? '-' + this.size.height * 1 / 3 + 'px' : '50%',
      'transform': this.center === "token" ? 'unset' : 'translate(-50%, -100%)',
    }
  }
  get imgStyles() {
    return {
      'width.px': this.img_size.width,
      'height.px': this.img_size.height,
      'bottom.px': this.center !== "token" ? '-' + this.size.width * 1 / 3 : 0,
      'position': 'absolute',
      'top': this.center !== "token" ? 'unset' : '50%',
      'left': this.center !== "token" ? this.img_size.height + 'px' : '50%',
      'transform': this.center !== "token" ? 'unset' : 'translate(-50%, -50%)',
    }
  }
  onResize() {
    this.padding = new Padding(Math.round(this.size.width / 5));
    this.img_size = this.size.subpadding(this.padding).subpadding(new Padding(2));

  }
  ngOnInit() {
    this.token = this.token_id == -1 ? this.token : materials.find(x => x.id == this.token_id);
    this.onResize();
    console.log(this.token)
    this.src = 'assets/icon/' + this.token.imgInfo.type + '/' + this.token.imgInfo.name + '-96.png';
  }

}
