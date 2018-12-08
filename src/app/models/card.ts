import { Token, ListToken } from './token';
import { materials } from '@data/token';
import { Helper } from './helper';
export class Card {
  id: number;
  level: number;
  value: { point: number, token_id: number }
  price: ListToken[];
  img: string;
  constructor(level: number) {
    this.level = level;
    this.value = { point: 0, token_id: 1 };
    this.price = [];
    this.generateCard();
    this.img = "";
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
    this.value.point = Helper.randomIntFromInterval(value_ranger[0], value_ranger[1]);
    this.value.token_id = Helper.randomTokenId();
    let maxToken;
    maxToken = Helper.randomIntFromInterval(token_ranger[0], token_ranger[1]);
    let countToken;
    if (this.level == 0 && maxToken == 4) {
      countToken = 4;
    }
    else {
      countToken = Helper.randomIntFromInterval(price_ranger[0], price_ranger[1])
    };
    let price: ListToken[] = [];
    switch (maxToken) {
      case 1:
        price = [{ count: price_ranger[0], token_id: Helper.randomTokenId() }]
        break;
      default:
        // let temp
        // let except_array = []
        // for (let i = 0; i < maxToken - 1; i++) {
        //   let decreas_max = (price_ranger[1] > 10 && maxToken + i > 1) ? 5 : 0
        //   temp = { count: Helper.randomIntFromInterval(1, price_ranger[1] - maxToken + i + 1 - decreas_max), token_id: Helper.randomTokenId(except_array) };
        //   price_ranger[1] = price_ranger[1] - temp.count;
        //   except_array.push(temp.token_id);
        //   price.push(temp);
        // }
        // temp = { count: price_ranger[1], token_id: Helper.randomTokenId(except_array) };
        // price.push(temp);
        let price_array = [];
        let temp;
        let except_array = []
        let dk_down = Math.floor(price_ranger[0] / maxToken);
        let dk_up = Math.floor(price_ranger[1] / maxToken)
        if (dk_up <= 1) {
          dk_down = 0;
          dk_up = 1;
        }
        for (let i = dk_down; i < dk_up + 1; i++) {
          if (i > 0)
            price_array.push(Math.floor((price_ranger[0] - 2) / 3) + i);
        }
        let tempcount = 1
        for (let i = 0; i < maxToken - 1; i++) {
          tempcount = Helper.getItemRandomInArray(price_array);
          temp = { count: tempcount, token_id: Helper.randomTokenId(except_array) };
          except_array.push(temp.token_id);
          price_ranger[1] = price_ranger[1] - temp.count;
          price.push(temp);
        }
        if (price_ranger[1] <= 0) {
          let need_get = true;
          price.forEach(x => {
            if (need_get && x.count > 2) {
              x.count--;
              price_ranger[1] = 1;
              need_get = false;
            }
          })
        }
        temp = { count: price_ranger[1], token_id: Helper.randomTokenId(except_array) };
        price.push(temp);
        break;
    }
    this.price = price;
  }



}
