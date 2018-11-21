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
  tokensCount: { count: number, token_id: any }[] = [];
  cardCount: number[] = [40, 30, 20];
  listCards: { level: number, list: Card[] }[];
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
        for (let index = 0; index < materials.length; index++) {
          this.tokensCount[index] = { count: materials[index].id == 0 ? 5 : 4, token_id: materials[index].id }
        }
        break;
      case 3:
        for (let index = 0; index < materials.length; index++) {
          this.tokensCount[index] = { count: materials[index].id == 0 ? 5 : 5, token_id: materials[index].id }
        }
        break;
      default:
        for (let index = 0; index < materials.length; index++) {
          this.tokensCount[index] = { count: materials[index].id == 0 ? 5 : 7, token_id: materials[index].id }
        }
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
    this.listCards.push({ level: 0, list: this.card_1s });
    this.listCards.push({ level: 1, list: this.card_2s });
    this.listCards.push({ level: 2, list: this.card_3s });
  }
  addCard(level: number) {
    let cardlist = this.listCards.find(x => x.level === level).list;
    cardlist.push(new Card(level));
  }
  removeCard(card: Card) {
    let level = card.level;
    let cardList = this.listCards.find(x => x.level === level)
    let x = cardList.list.indexOf(card);
    cardList.list.splice(x, 1);
  }
  buyCard(card: Card) {
    if (!this._currentPlayer.canBuy(card)) {
      throw "Khong the mua";
      console.log('khong the mua');
      return;
    }
    this._currentPlayer.buyCard(card);
    this.removeCard(card);
    this.addCard(card.level);
  }
  holdCard(card: Card) {
    if (!this._currentPlayer.canHold()) {
      return;
    }
    this._currentPlayer.holdCard(card);
    this.removeCard(card);
    this.addCard(card.level);
  }
  setToken(tokenList: { count: number, token_id: any }[]) {
    this._currentPlayer.setToken(tokenList);
    tokenList.forEach(x => {
      this.tokensCount.find(y => y.token_id == x.token_id).count -= x.count;
    })
  }
}