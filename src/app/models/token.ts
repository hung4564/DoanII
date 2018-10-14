export class Token {
  id: number;
  name: string;
  color: string;
  imgInfo?: { name: string; type: string };
  constructor(id, name, color, imgInfo?) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.imgInfo = imgInfo;
  }
}