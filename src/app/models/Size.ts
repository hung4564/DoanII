export class Size {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
  }
  public toString() {
    return "width:" + this.width + ":" + "height:" + this.height;
  }
}