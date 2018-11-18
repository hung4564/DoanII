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
  listCards: {};
  card_1s: Array<Card>;
  card_2s: Array<Card>;
  card_3s: Array<Card>;
  constructor(list: IPlayer[]) {
    this.listCards = { 'card_1': null, 'card_2': null, 'card_3': null };
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
    this.card_2s = [];
    this.card_3s = [];
    for (let i = 1; i < 5; i++) {
      this.card_1s.push(new Card(0));
      this.card_2s.push(new Card(1));
      this.card_3s.push(new Card(2));
    }
    this.listCards['card_1'] = this.card_1s;
    this.listCards['card_2'] = this.card_2s;
    this.listCards['card_3'] = this.card_3s;
  }

}