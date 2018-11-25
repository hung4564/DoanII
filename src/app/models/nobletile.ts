
import { Token } from './token';
import { Card } from './card';
export class Nobletile extends Card {
  constructor(id: number, value: { point: number }, price: { count: number, token_id: number }[], img?) {
    super(0);
    this.id = id;
    this.value = { point: value.point, token_id: null };
    this.price = price;
    this.img = !!img ? img : "";
  }
}