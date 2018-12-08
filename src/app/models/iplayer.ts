
import { materials } from '@data/token';
import { Token } from '@angular/compiler';
import { Card } from './card';
import { LiteEvent } from './LiteEvent';
export class EventActionData {
  action: UserAction;
  user_id: number;
  isActive: boolean;
  data?: any;
}
export enum UserAction {
  buyCard,
  buyHold,
  buyInList,
  holdCard,
  setToken,
  needrefundToken,
  refundToken,
  passTurn
}
export enum TypePlayer {
  UserPlayer,
  AiPlayer
}
import { Nobletile } from './nobletile'; import { Type } from '@angular/compiler/src/core';
import { Helper } from './helper';
import { ListToken } from './token';
import { ProtractorExpectedConditions } from 'protractor';
export class IPlayer {
  id: number;
  name: string;
  img: string;
  materials: ListToken[] = [];
  product: ListToken[] = [];
  listCard: Card[];
  listHoldCard: Card[];
  listNobletile: Nobletile[];
  public IsMyTurn: boolean;
  public get canAccess(): boolean {
    return this.IsMyTurn && this.type == TypePlayer.UserPlayer;
  }
  protected type: TypePlayer = TypePlayer.UserPlayer;
  public get point() {
    let point = 0;
    if (this.listCard.length > 0) {
      point += this.listCard.map(item => item.value.point).reduce((prev, next) => prev + next)
    }
    if (this.listNobletile.length > 0) {
      point += this.listNobletile.map(item => item.value.point).reduce((prev, next) => prev + next)
    }
    return 15 + this.id;
  }
  public async getpoint(): Promise<number> {
    return this.point;
  }
  //event
  private readonly _eventActionOfUser = new LiteEvent<EventActionData>();
  public get eventActionOfUser() { return this._eventActionOfUser.expose(); }
  private readonly _eventEndTurn = new LiteEvent<EventActionData>();
  public get eventEndTurn() { return this._eventEndTurn.expose(); }

  constructor(name?, img?) {
    this.img = img ? img : 'assets/img/user.png';
    this.name = name ? name : 'player';
    this.listCard = [];
    this.listHoldCard = [];
    this.listNobletile = [];
    this.IsMyTurn = false;
    materials.forEach((item, index) => {
      this.materials.push({ count: 0, token_id: item.id });
    })
    materials.filter(x => x.id > 0).forEach((item, index) => {
      this.product.push({ count: 0, token_id: item.id });
    })
  }
  startTurn(cardsListInBoard: { level: number, count: number, list: Card[] }[], materialsLeftInBoard: ListToken[]) {
    this.IsMyTurn = true;
  }
  passTurn() {
    this.endTurn()
  }
  endTurn() {
    let count = this.materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (count > 10) {
      this.needRefundToken(count - 10);
    }
    else {
      this.IsMyTurn = false;
      Helper.delay(1000).then(() => {

        this._eventEndTurn.trigger();
      })
    }
  }
  callEvent(action: UserAction, isActive: boolean, data?: any) {
    this._eventActionOfUser.trigger({ action: action, user_id: this.id, isActive, data: data });
  }
  needRefundToken(count_need_remove: number) {
    //this.callEvent(UserAction.needrefundToken, true);
  }
  async buyHoldCard(card: Card): Promise<boolean> {
    return this.canBuy(card).then(value => {
      if (value) {
        this.buyCard(card).then(result => {
          let x = this.listHoldCard.indexOf(card);
          this.listHoldCard.splice(x, 1);
          this.callEvent(UserAction.buyHold, true, { card: card, list_return: result });
          return true;
        });
      }
      else {
        //this.callEvent(UserAction.buyHold, false);
        return false
      }
    })
  }
  async buyInList(card: Card): Promise<boolean> {
    return this.canBuy(card).then(value => {
      if (value) {
        this.buyCard(card).then(result => {
          if (result) {
            this.callEvent(UserAction.buyInList, true, { card: card, list_return: result });
          }
          return result
        });
        return value;
      }
      else {
        //this.callEvent(UserAction.buyInList, false);
        return false
      }
    })
  }
  async buyCard(card: Card): Promise<ListToken[]> {
    // if (!this.canBuy(card)) {
    //   this.callEvent(UserAction.buyCard, false);
    //   return false;
    // }
    let list_return: ListToken[] = [];
    let difference_count: number = 0;
    let temp
    card.price.forEach((value, index) => {
      let material = this.materials.find(x => x.token_id == value.token_id);
      if (material.count > value.count) {
        temp = Helper.copy(value.count);
        material.count -= temp;
      }
      else {
        temp = Helper.copy(material.count);
        difference_count += Helper.copy(value.count - material.count);
        material.count = 0;
      }
      list_return.push({ count: temp, token_id: value.token_id })
    })
    if (difference_count > 0) {
      this.materials.find(x => x.token_id == 0).count -= difference_count;
      list_return.push({ count: difference_count, token_id: 0 })
    }
    this.product.find(x => x.token_id == card.value.token_id).count++;
    this.listCard.push(card);
    return list_return;
  }
  async holdCard(card: Card): Promise<boolean> {
    return this.canHold().then(value => {
      if (value) {
        let token = this.materials.find(x => x.token_id == 0);
        token.count++;
        this.listHoldCard.push(card);
        this.callEvent(UserAction.holdCard, true, card);
        return true;
      }
      else {
        //this.callEvent(UserAction.holdCard, false, card);
        return false;
      }
    })
  }
  async canHold(): Promise<boolean> {
    //moi nguoi khong the dc giu qua 3 the hay 3 dong vang
    return this.materials.find(x => x.token_id == 0).count < 3 || this.listHoldCard.length < 3
  }
  async canBuy(card: Card): Promise<boolean> {
    if (!!card) {
      let count_need: number = 0; // gia tri can bu 
      let material: ListToken;
      let product: ListToken;
      let difference_count: number = 0;
      card.price.forEach((item, index) => {
        material = this.materials.find(x => x.token_id == item.token_id);
        product = this.product.find(x => x.token_id == item.token_id);
        difference_count = item.count - (material.count + product.count);
        //neu chenh lenh nho hon => can bu von, khong thi khong can
        count_need = count_need + (difference_count > 0 ? difference_count : 0)
      })
      //neu nhu bu < von => co the mua
      if (count_need == 0) return true;
      return (count_need <= this.materials.find(x => x.token_id == 0).count);
    }
    return false;
  }
  async setToken(tokenList: ListToken[]): Promise<boolean> {
    if (!!tokenList) {
      tokenList.forEach(token => {
        this.materials.find(x => x.token_id == token.token_id).count += token.count;
      })
      this.callEvent(UserAction.setToken, true, tokenList);
      return true;
    }
    return false;
  }
  async refundToken(data: ListToken[]): Promise<void> {
    let playerToken;
    data.forEach(token => {
      playerToken = this.materials.find(x => x.token_id == token.token_id)
      playerToken.count = playerToken.count - token.count;
    })
    this.callEvent(UserAction.refundToken, true, data);
  }
  setNobletile(nobletiles: Nobletile) {
    this.listNobletile.push(nobletiles);
  }
}
