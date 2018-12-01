export class Size {
  width: number;
  height: number;
  constructor(width: number, height: number = 0) {

    this.height = Math.floor((height == 0) ? width : height);
    this.width = Math.floor(width);
  }
  public toString() {
    return "width:" + this.width + ":" + "height:" + this.height;
  }
  public subpadding(padding: Padding) {
    return new Size(this.width - padding.padding_left - padding.padding_right, this.height - padding.padding_top - padding.padding_bottom);

  }
  public subpaddingNumber(param1: number, param2: number = 0, param3: number = 0, param4: number = 0) {
    let padding = new Padding(param1, param2, param3, param4);
    return this.subpadding(padding);
  }
}
export class Padding {
  padding_top: number;
  padding_bottom: number;
  padding_left: number;
  padding_right: number;
  constructor(param1: number, param2: number = 0, param3: number = 0, param4: number = 0) {
    this.padding_top = param1;
    this.padding_bottom = param1;
    this.padding_left = param1;
    this.padding_right = param1;
    if (param2 != 0) {
      this.padding_left = param2;
      this.padding_right = param2;
      if (param3 != 0) {
        this.padding_bottom = param3;
        if (param4 != 0) {
          this.padding_left = param4;
        }
      }
    }
  }
  public toStringPx() {
    return this.padding_top + "px " + this.padding_right + "px " + this.padding_bottom + "px " + this.padding_left + "px "
  }
}