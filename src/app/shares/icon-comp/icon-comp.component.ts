import { Component, OnInit, Input } from '@angular/core';
import { Token } from '@model/token';
import { Size, Padding } from '@model/Size';
import { materials } from '@data/token';
import { rubberBandAnimation, collapseAnimation } from 'angular-animations';

@Component({
  selector: 'icon-comp',
  templateUrl: './icon-comp.component.html',
  styleUrls: ['./icon-comp.component.css'],
  host: {
    '(window:resize)': 'onResize()',
  },
  animations: [
    rubberBandAnimation(),
    collapseAnimation(),
  ]
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
  @Input() set count(value: number) {
    this._count = value;
    this.isAnimations = true;
    setTimeout(() => {
      this.isAnimations = !this.isAnimations;

    }, 2000);
  }

  get count(): number {
    return this._count;
  }
  private _count: number;
  public isAnimations: boolean;
  @Input() center: string = 'token';
  @Input() type: string = 'round'; //round or rectangle
  @Input() disable: boolean;
  public get _src(): string {
    if (!!this.token) {
      return 'assets/icon/' + this.token.imgInfo.type + '/' + (this.disable ? 'disable-' : '') + this.token.imgInfo.name + '-96.png';

    }
  };
  img_size: Size;
  padding: Padding;
  constructor() {
  }
  get containerStyle() {
    return {
      'color': (this.disable ? '#cccccc' : '#' + this.token.color) + 'CC',
      'background-color': (this.disable ? '#cccccc' : '#' + this.token.color) + '33',
      'border': 'solid 2px',
      'width.px': this.type == 'round' ? this.size.width : this.size.height * 2 / 3,
      'height.px': this.size.height,
      'position': 'relative',
      'border-radius': this.type == 'round' ? '50%' : 'none'
    }
  }
  get countStyles() {
    return {
      'font-size.px': this.size.height * 1 / 2,
      'bottom.px': this.center === "token" ? '-' + this.size.width * 1 / 3 : 0,
      'position': this.center === "token" ? 'absolute' : 'static',
      'left': this.center === "token" ? '-' + this.size.height * 1 / 8 + 'px' : 'unset',
    }
  }
  get imgStyles() {
    return {
      'width.px': this.img_size.width,
      'height.px': this.img_size.height,
      'bottom.px': this.center !== "token" ? '-' + this.size.width * 1 / 3 : 'unset',
      'position': this.center !== "token" ? 'absolute' : 'static',
      'left': this.center !== "token" ? this.img_size.height + 'px' : '50%',
    }
  }
  onResize() {
    this.padding = new Padding(Math.round(this.size.width / 5));
    this.img_size = this.size.subpadding(this.padding).subpadding(new Padding(2));

  }
  ngOnInit() {
    this.onResize();
    this.token = materials.find(x => x.id == this.token_id);
  }

}