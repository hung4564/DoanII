import { IPlayer } from '@interface/iplayer'

import { Token } from '@model/token';
import { Card } from '@model/card';
import { materials } from '@data/token';
export class Board {
  countPlayer
  listPlayer: IPlayer[];
  tokensCount: number[] = [5, 7, 7, 7, 7, 7];
  materials: Token[] = materials;
  cardCount: number[] = [40, 30, 20];
  card_1s: Array<Card>;
  card_2s: Array<Card>;
  card_3s: Array<Card>;
  constructor(list: IPlayer[]) {
    this.listPlayer = list;
    this.init();
  }
  private init() {
    this.countPlayer = this.listPlayer.length;
    switch (this.countPlayer) {
      case 2:
        this.tokensCount = [5, 4, 4, 4, 4, 4];
        break;
      case 3:
        this.tokensCount = [5, 5, 5, 5, 5, 5];
        break;
      default:
        this.tokensCount = [5, 7, 7, 7, 7, 7];
        break;
    }
    this.card_1s = [];
    for (let i = 1; i < 5; i++) {
      this.card_1s.push(this.generateCard(0));
    }
  }
  private generateCard(levelcard: number) {
    let temp = new Card();
    let value_ranger;
    let price_ranger;
    switch (levelcard) {
      case 0:
        value_ranger = [0, 0];
        price_ranger = [3, 4];
        break;
      case 1:
        value_ranger = [1, 2];
        price_ranger = [5, 8];
        break;
      case 2:
        value_ranger = [3, 4];
        price_ranger = [7, 15];
        break;
      default:
        break;
    }
    temp.value.point = this.randomIntFromInterval(value_ranger[0], value_ranger[1]);
    temp.value.token = this.randomToken();
    let maxToken = this.randomIntFromInterval(1, 4);
    let countToken = this.randomIntFromInterval(price_ranger[0], price_ranger[1]);
    let price: { count: number, token: Token }[] = [];
    for (let i = 1; i < maxToken; i++) {
      let get_token = this.randomToken();
      if (!price.filter(price => (price.token === get_token))) {
        price.push({ count: 0, token: get_token });
      }
    }
    price.forEach(function (value) {
      value.count = this.randomIntFromInterval(1, Math.round(countToken / price.length));
    })
    temp.price = price;
    return temp;
  }
  private randomToken() {
    return materials[this.randomIntFromInterval(0, 3)];
  }
  private randomIntFromInterval(min, max) // min and max included
  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}