
import { Token } from './token';
export class Nobletile {
  id: number;
  value: { point: number }
  price: { count: number, token_id: number }[];
  img: string;
  constructor(id: number, value: { point: number }, price: { count: number, token_id: number }[], img?) {
    this.id = id;
    this.value = value;
    this.price = price;
    this.img = !!img ? img : "";
  }
}