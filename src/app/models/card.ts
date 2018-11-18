import { Token } from './token';
import { materials } from '@data/token';
export class Card {
  level: number;
  value: { point: number, token: Token }
  price: { count: number, token: Token }[];
  img: string;
  constructor(level: number) {
    this.level = level;
    this.value = { point: 0, token: materials.find(x => x.id === 1) };
    this.price = [];
    this.generateCard();
  }
  private generateCard() {
    let value_ranger;
    let price_ranger;
    let token_ranger;
    switch (this.level) {
      case 0:
        value_ranger = [0, 0];
        price_ranger = [3, 4];
        token_ranger = [1, 4];
        break;
      case 1:
        value_ranger = [1, 2];
        price_ranger = [5, 8];
        token_ranger = [1, 4];
        break;
      case 2:
        value_ranger = [3, 4];
        price_ranger = [7, 15];
        token_ranger = [2, 4];
        break;
      default:
        break;
    }
    this.value.point = this.randomIntFromInterval(value_ranger[0], value_ranger[1]);
    this.value.token = this.randomToken();
    let maxToken;
    maxToken = this.randomIntFromInterval(token_ranger[0], token_ranger[1]);
    let countToken;
    if (this.level == 0 && maxToken == 4) {
      countToken = 4;
    }
    else {
      countToken = this.randomIntFromInterval(price_ranger[0], price_ranger[1])
    };
    let price: { count: number, token: Token }[] = [];
    switch (maxToken) {
      case 1:
        price = [{ count: countToken, token: this.randomToken() }]
        break;
      default:
        let temp
        let except_array = []
        for (let i = 0; i < maxToken - 1; i++) {
          let decreas_max = (price_ranger[1] > 10 && maxToken + i > 1) ? 5 : 0
          temp = { count: this.randomIntFromInterval(1, price_ranger[1] - maxToken + i + 1 - decreas_max), token: this.randomToken(except_array) };
          price_ranger[1] = price_ranger[1] - temp.count;
          except_array.push(temp.token.id);
          price.push(temp);
        }
        temp = { count: price_ranger[1], token: this.randomToken(except_array) };
        price.push(temp);
        break;
    }
    this.price = price;
  }
  private randomToken(except: number[] = []) {
    let token_id
    do {
      token_id = this.randomIntFromInterval(1, 5);
    }
    while (except.includes(token_id));
    return materials.find(x => x.id === token_id);
  }
  private randomIntFromInterval(min, max) // min and max included
  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
