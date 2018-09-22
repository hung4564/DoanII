import { Token } from './token';
export class Card {
  value: { point: number, token: Token }
  price: [{ count: number, token: Token }];
  img: string;
}
