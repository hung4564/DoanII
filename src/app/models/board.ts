import { IPlayer, EventActionData, UserAction } from '@model/iplayer'

import { Token } from '@model/token';
import { Card } from '@model/card';
import { materials, } from '@data/token';
import { nobletiles } from '@data/card'
import { LiteEvent } from './LiteEvent';
import { Nobletile } from './nobletile';
import { Message } from '@model/message';
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
  listToken: { count: number, token_id: any }[] = [];
  listCards: { level: number, count: number, list: Card[] }[];
  isEndGame: boolean = false;

  //event
  private readonly _eventBoardNotice = new LiteEvent<Message>();
  public get eventBoardNotice() { return this._eventBoardNotice.expose(); }

  private readonly _eventEndGame = new LiteEvent<any>();
  public get eventEndGame() { return this._eventEndGame.expose(); }

  private readonly _eventRefundToken = new LiteEvent<any>();
  public get eventRefundToken() { return this._eventRefundToken.expose(); }


  constructor(list: IPlayer[]) {
    this.listCards = [];
    this.listPlayer = list;
    this.init();
    this._currentPlayer = this.listPlayer[0];
    this._currentPlayer.IsMyTurn = true;
    this._indexPlayer = 0;
    this.listNobletile = nobletiles;
    let eventActionOfUser = (data: EventActionData) => { this.afterActionOfUser(data); }
    this.listPlayer.forEach((x, index) => {
      x.id = index;
      x.eventActionOfUser.on(eventActionOfUser);
      x.eventEndTurn.on(data => this.endUserTurn(x.id));
    })
  }
  public startGame() { }
  private init() {
    switch (this.countPlayer) {
      case 2:
        for (let index = 0; index < materials.length; index++) {
          this.listToken[index] = { count: materials[index].id == 0 ? 5 : 4, token_id: materials[index].id }
        }
        break;
      case 3:
        for (let index = 0; index < materials.length; index++) {
          this.listToken[index] = { count: materials[index].id == 0 ? 5 : 5, token_id: materials[index].id }
        }
        break;
      default:
        for (let index = 0; index < materials.length; index++) {
          this.listToken[index] = { count: materials[index].id == 0 ? 5 : 7, token_id: materials[index].id }
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
    this.listCards.push({ level: 0, count: 40, list: card_1s });
    this.listCards.push({ level: 1, count: 30, list: card_2s });
    this.listCards.push({ level: 2, count: 20, list: card_3s });
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
    cardList.count--;
  }
  onActionOfUser(type: string, data?) {
    switch (type) {
      case 'hold':
        this._currentPlayer.holdCard(data)
        break;
      case 'buy':
        this._currentPlayer.buyCard(data);
        break;
      case 'setToken':
        this._currentPlayer.setToken(data);
        break;
      case 'refundToken':
        this._currentPlayer.refundToken(data);
        break;
      case 'pass':
        this._currentPlayer.passTurn();
        break;
      default:
        break;
    }
  }
  afterActionOfUser(data: EventActionData) {
    if (data.isActive) {
      switch (data.action) {
        case UserAction.buyCard:
          this.buyCard(data.data);
          break;
        case UserAction.holdCard:
          this.holdCard(data.data);
          break;
        case UserAction.setToken:
          this.setToken(data.data);
          break;
        case UserAction.refundToken:
          this.refundToken(data.data)
          break;
        case UserAction.needrefundToken:
          this._eventRefundToken.trigger();
          return;
          break;
        default:
          break;
      }
      this._currentPlayer.endTurn();
    }
    else {
      this._eventBoardNotice.trigger(new Message('cant do that'))
    }

  }
  refundToken(data) {
    let boardToken;
    data.forEach(token => {
      boardToken = this.listToken.find(x => x.token_id == token.token_id);
      boardToken.count = boardToken.count + token.count;
    })
  }
  buyCard(card: Card) {
    this.removeCard(card);
    this.addCard(card.level);
  }
  holdCard(card: Card) {
    this.removeCard(card);
    this.addCard(card.level);
  }
  setToken(tokenList: { count: number, token_id: any }[]) {
    if (!!tokenList) {
      tokenList.forEach(x => {
        this.listToken.find(y => y.token_id == x.token_id).count -= x.count;
      })
    }
  }
  checkNobletile() {
    //check the quy toc
    let get = true;
    let get_index = -1;
    this.listNobletile.every((nobletiles, index) => {
      get = true;
      nobletiles.price.every(token => {
        if (this._currentPlayer.product.find(x => x.token_id == token.token_id).count < token.count) {
          get = false;
          return false;
        }
        return true;
      })
      if (get == true) {
        this._currentPlayer.setNobletile(nobletiles);
        get_index = index;
        return false;
      }
      return true;
    })
    if (get_index >= 0) {
      this.listNobletile.splice(get_index, 1);
    }
    return get;

  }
  endGame() {
    let scorelist: { player_id: number, name: string, point: number }[] = [];
    this.listPlayer.forEach(player => {
      scorelist.push({ player_id: player.id, name: player.name, point: player.point });
    })
    scorelist.sort((x, y) => { return y.point - x.point })
    this._eventEndGame.trigger(scorelist);
  }
  endUserTurn(user_id?: number) {
    if (!user_id && user_id != this._currentPlayer.id) {
      return;
    }
    this.checkNobletile();
    this.changeNextPlayer();
    this._currentPlayer.startTurn();
  }
  changeNextPlayer() {
    if (this._currentPlayer.point >= 15) {
      this.isEndGame = true;
    }
    if (this.isEndGame) {
      if (this._currentPlayer.id == 3) this.endGame();
    }
    this._currentPlayer.IsMyTurn = false;
    this._currentPlayer = this.listPlayer[++this._indexPlayer % this.countPlayer];
    this._currentPlayer.IsMyTurn = true;
  }
}