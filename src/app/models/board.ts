import { IPlayer } from '@model/iplayer'

import { Token } from '@model/token';
import { Card } from '@model/card';
import { materials, nobletiles } from '@data/token';
import { LiteEvent } from './LiteEvent';
import { Nobletile } from './nobletile';
export class BroadConfig {
  timeOneTurn: number;//minute
  maxPlayer: number;//int
  maxPointWin: number;//int
  constructor() {
    this.timeOneTurn = 15;
    this.maxPlayer = 4;
    this.maxPointWin = 15;
  }
}
export enum UserAction {
  buyCard,
  holdCard,
  setToken,
  refundToken
}
export class Board {
  get countPlayer() {
    return this.listPlayer.length;
  }
  get currentPlayer(): IPlayer {
    return this._currentPlayer;
  }
  private _indexPlayer;
  get indexCurrentPlayer() {
    return this._indexPlayer;
  }
  private _currentPlayer: IPlayer;
  listPlayer: IPlayer[];
  listNobletile: Nobletile[];
  tokensCount: { count: number, token_id: any }[] = [];
  cardCount: number[] = [40, 30, 20];
  listCards: { level: number, list: Card[] }[];
  isEndGame: boolean = false;
  constructor(list: IPlayer[]) {
    this.listCards = [];
    this.listPlayer = list;
    this.init();
    this._currentPlayer = this.listPlayer[0];
    this._indexPlayer = 0;
    this.listNobletile = nobletiles;
    let eventEndTurn = data => { this.endUserTurn(); }
    this.listPlayer.forEach(x => {
      x.eventBuyCard.on(eventEndTurn);
      x.eventHoldCard.on(eventEndTurn);
      x.eventSetToken.on(eventEndTurn);
      x.eventRefundToken.on(eventEndTurn);
    })
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
    let card_1s = [];
    let card_2s = [];
    let card_3s = [];
    for (let i = 0; i < 4; i++) {
      card_1s.push(new Card(0));
      card_2s.push(new Card(1));
      card_3s.push(new Card(2));
    }
    this.listCards.push({ level: 0, list: card_1s });
    this.listCards.push({ level: 1, list: card_2s });
    this.listCards.push({ level: 2, list: card_3s });
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
  actionOfUser(type: string, data) {
    switch (type) {
      case 'hold':
        this.holdCard(data)
        break;
      case 'buy':
        this.buyCard(data);
        break;
      case 'setToken':
        this.setToken(data);
        break;
      case 'refundToken':
        break;
    }
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
  setToken(tokenList: { count: number, token_id: any }[]) {
    if (!!tokenList) {
      this._currentPlayer.setToken(tokenList);
      tokenList.forEach(x => {
        this.tokensCount.find(y => y.token_id == x.token_id).count -= x.count;
      })
    }
  }
  checkNobletile() {
    //check the quy toc
    let get = true;
    this.listNobletile.forEach(nobletiles => {
      nobletiles.price.forEach(token => {
        if (this._currentPlayer.product.find(x => x.token_id == token.token_id).count < token.count) {
          get = false;
        }
      })
      if (get == true) {
        this._currentPlayer.setNobletile(nobletiles);
        return
      }
    })

  }
  endGame() {

  }
  endUserTurn() {
    this.checkNobletile();
    this.changeNextPlayer();
  }
  changeNextPlayer() {
    if (this._currentPlayer.point >= 15) {
      this.isEndGame = true;
    }
    if (this.isEndGame) {
      if (this._indexPlayer == 3) this.endGame();
    }
    this._currentPlayer = this.listPlayer[++this._indexPlayer % this.countPlayer];
  }
}