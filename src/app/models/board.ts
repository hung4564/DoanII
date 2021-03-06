import { IPlayer, EventActionData, UserAction } from '@model/iplayer'

import { Token, ListToken } from '@model/token';
import { Card } from '@model/card';
import { materials, } from '@data/token';
import { nobletiles } from '@data/card'
import { LiteEvent } from './LiteEvent';
import { Nobletile } from './nobletile';
import { Message } from '@model/message';
import { Helper } from './helper';
export class BoardConfig {
  timeOneTurn: number;//minute
  maxPlayer: number;//int
  maxPointWin: number;//int
  maxCpus: number;
  constructor() {
    this.maxCpus = 3;
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
  listToken: ListToken[] = [];
  listCards: { level: number, count: number, list: Card[] }[];
  isEndGame: boolean = false;
  config: BoardConfig;
  //event
  private readonly _eventBoardNotice = new LiteEvent<Message>();
  public get eventBoardNotice() { return this._eventBoardNotice.expose(); }

  private readonly _eventEndGame = new LiteEvent<any>();
  public get eventEndGame() { return this._eventEndGame.expose(); }

  private readonly _eventRefundToken = new LiteEvent<any>();
  public get eventRefundToken() { return this._eventRefundToken.expose(); }

  private readonly _eventNextPlayer = new LiteEvent<any>();
  public get eventNextPlayer() { return this._eventNextPlayer.expose(); }

  constructor() {
    this.listCards = [];
    this.listPlayer = [];
    this.config = new BoardConfig();
    this.init();
    this.listNobletile = nobletiles;

  }
  public settingGame() {
    if (this.listPlayer.length > 0) {
      this._currentPlayer = this.listPlayer[0];
      this._indexPlayer = 0;
      let eventActionOfUser = (data: EventActionData) => { this.afterActionOfUser(data); }
      this.listPlayer.forEach((x, index) => {
        x.id = index;
        x.eventActionOfUser.on(eventActionOfUser);
        x.eventEndTurn.on(data => this.endUserTurn(x.id));
      })
    }
  }
  public async startGame() {
    this._currentPlayer.startTurn(this.listCards, this.listToken);
  }
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
  private addCard(level: number) {
    let cardlist = this.listCards.find(x => x.level === level);
    if (cardlist.count > 0)
      cardlist.list.push(new Card(level));
  }
  private removeCard(card: Card) {
    let level = card.level;
    let cardList = this.listCards.find(x => x.level === level)
    let x = cardList.list.indexOf(card);
    cardList.list.splice(x, 1);
    cardList.count--;
  }
  private checkCard(card: Card) {
    let level = card.level;
    let cardList = this.listCards.find(x => x.level === level)
    if (!!cardList) {
      return cardList.list.includes(card);
    }
    return false;
  }
  onActionOfUser(type: string, data?) {
    switch (type) {
      case 'holdCard':
        this._currentPlayer.holdCard(data)
        break;
      case 'buyInList':
        this._currentPlayer.buyInList(data);
        break;
      case 'buyHold':
        this._currentPlayer.buyHoldCard(data);
        break
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
        case UserAction.buyInList:
          this.changeCardInList(data.data.card).then(() => {
            this.refundToken(data.data.list_return);
            this._currentPlayer.endTurn();
          });
          break;
        case UserAction.holdCard:
          this.changeCardInList(data.data).then(() => {
            this._currentPlayer.endTurn();
          });
          break;
        case UserAction.setToken:
          this.setToken(data.data).then(() => {
            this._currentPlayer.endTurn();
          });
          break;
        case UserAction.refundToken:
          this.refundToken(data.data).then(() => {
            this._currentPlayer.endTurn();
          });
          break;
        case UserAction.needrefundToken:
          this.needRefunToken();
          return;
          break;
        case UserAction.buyHold:
          this.refundToken(data.data.list_return).then(() => {
            this._currentPlayer.endTurn();
          })
          break;
        default:
          break;
      }
    }
    else {
      this._eventBoardNotice.trigger(new Message('cant do that'))
    }

  }
  private needRefunToken() {
    this._eventRefundToken.trigger();
  }
  private async refundToken(data) {
    let boardToken;
    data.forEach(token => {
      boardToken = this.listToken.find(x => x.token_id == token.token_id);
      boardToken.count = boardToken.count + token.count;
    })
  }
  private async changeCardInList(cardremove: Card) {
    if (this.checkCard(cardremove)) {
      // this.removeCard(cardremove);
      // this.addCard(cardremove.level);
      let level = cardremove.level;
      let cardList = this.listCards.find(x => x.level === level)
      let x = cardList.list.indexOf(cardremove);
      cardList.list[x] = new Card(level);
      cardList.count--;
    }
  }
  private async setToken(tokenList: ListToken[]) {
    if (!!tokenList) {
      tokenList.forEach(x => {
        this.listToken.find(y => y.token_id == x.token_id).count -= x.count;
      })
    }
  }
  private async checkNobletile(): Promise<boolean> {
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
      player.getpoint().then(result => {
        scorelist.push({ player_id: player.id, name: player.name, point: result });
      })
    })
    //scorelist.sort((x, y) => { return y.point - x.point })
    this._eventEndGame.trigger(scorelist);
  }
  async endUserTurn(user_id?: number): Promise<void> {
    if (!!user_id && user_id != this._currentPlayer.id) {
      return;
    }
    this.checkNobletile().then(value => {

      this.changeNextPlayer().then(() => {
        Helper.delay(1000).then(() => {
          this._eventNextPlayer.trigger();
          this._currentPlayer.startTurn(this.listCards, this.listToken);
        })
      });
    });
  }
  private async changeNextPlayer(): Promise<void> {
    this, this._currentPlayer.getpoint().then(result => {
      if (result >= this.config.maxPointWin) {
        this.isEndGame = true;
      }
      if (this.isEndGame) {
        if (this._currentPlayer.id == 3) this.endGame();
      }
      this._currentPlayer = this.listPlayer[++this._indexPlayer % this.countPlayer];
    })

  }
}