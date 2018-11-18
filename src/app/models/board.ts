import { IPlayer } from '@model/iplayer'

import { Token } from '@model/token';
import { Card } from '@model/card';
import { materials } from '@data/token';
export class Board {
  get countPlayer() {
    return this.listPlayer.length;
  }
  get currentPlayer() {
    return this._currentPlayer;
  }
  private _currentPlayer;
  listPlayer: IPlayer[];
  tokensCount: number[] = [5, 7, 7, 7, 7, 7];
  materials: Token[] = materials;
  cardCount: number[] = [40, 30, 20];
  listCards: { name: string, list: Card[] }[];
  private card_1s: Array<Card>;
  private card_2s: Array<Card>;
  private card_3s: Array<Card>;
  constructor(list: IPlayer[]) {
    this.listCards = [];
    this.listPlayer = list;
    this.init();
    this._currentPlayer = this.listPlayer[0];
  }
  private init() {
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
    for (let i = 0; i < 4; i++) {
      this.card_1s.push(new Card(0));
      this.card_2s.push(new Card(1));
      this.card_3s.push(new Card(2));
    }
    this.listCards.push({ name: 'level 1', list: this.card_1s });
    this.listCards.push({ name: 'level 2', list: this.card_2s });
    this.listCards.push({ name: 'level 3', list: this.card_3s });
  }
  addCard(level: number) {
    this.listCards['card_' + (level + 1)].push(new Card(level));
  }
  removeCard(card: Card) {
    let level = card.level;
    let levelstring = 'card_' + (level + 1)
    let x = this.listCards[levelstring].indexOf(card);
    this.listCards[levelstring].splice(x, 1);
  }
  buyCard(card: Card) {
    this._currentPlayer.buyCard(card);
    this.removeCard(card);
    this.addCard(card.level);
  }
  holdCard(card: Card) {
    this._currentPlayer.holdCard(card);
    this.removeCard(card);
    this.addCard(card.level);
  }
}