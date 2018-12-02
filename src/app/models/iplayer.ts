
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
export class IPlayer {
  id: number;
  name: string;
  img: string;
  materials: { count: number, token_id: number }[] = [];
  product: { count: number, token_id: number }[] = [];
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
    return point;
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
  startTurn(cardsListInBoard: { level: number, count: number, list: Card[] }[], materialsLeftInBoard: { count: number, token_id: any }[]) {

  }
  passTurn() {
    this.endTurn()
  }
  endTurn() {
    let count = this.materials.map(item => item.count).reduce((prev, next) => prev + next);
    if (count > 10) {
      this.needRefundToken(count - 10).then();
      return;
    }
    this._eventEndTurn.trigger();
  }
  callEvent(action: UserAction, isActive: boolean, data?: any) {
    this._eventActionOfUser.trigger({ action: action, user_id: this.id, isActive, data: data });
  }
  protected async needRefundToken(count_need_remove: number) {
    //this.callEvent(UserAction.needrefundToken, true);
  }
  async buyHoldCard(card: Card) {
    this.canBuy(card).then(value => {
      if (value) {
        this.buyCard(card).then(() => {
          let x = this.listHoldCard.indexOf(card);
          this.listHoldCard.splice(x, 1);
          this.callEvent(UserAction.buyHold, true, card);
        });
      }
      else {
        //this.callEvent(UserAction.buyHold, false);
      }
    })
  }
  async buyInList(card: Card) {
    this.canBuy(card).then(value => {
      if (value) {
        this.buyCard(card).then(value => {
          this.callEvent(UserAction.buyInList, true, card);
        });
      }
      else {
        //this.callEvent(UserAction.buyInList, false);
      }
    })
  }
  async buyCard(card: Card): Promise<void> {
    // if (!this.canBuy(card)) {
    //   this.callEvent(UserAction.buyCard, false);
    //   return false;
    // }
    card.price.forEach((item, index) => {
      let material = this.materials.find(x => x.token_id == item.token_id);
      let product = this.product.find(x => x.token_id == item.token_id);
      material.count = material.count - item.count + product.count;
    })
    this.product.find(x => x.token_id == card.value.token_id).count++;
    this.listCard.push(card);
  }
  holdCard(card: Card) {
    this.canHold().then(value => {
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
      let material: { count: number, token_id: number };
      let product: { count: number, token_id: number };
      let difference_count: number = 0;
      card.price.forEach((item, index) => {
        material = this.materials.find(x => x.token_id == item.token_id);
        product = this.product.find(x => x.token_id == item.token_id);
        difference_count = item.count - (material.count + product.count);
        //neu chenh lenh nho hon => can bu von, khong thi khong can
        count_need = count_need + (difference_count > 0 ? difference_count : 0)
      })
      //neu nhu bu < von => co the mua
      return (count_need <= this.materials.find(x => x.token_id == 0).count);
    }
    return false;
  }
  async setToken(tokenList: { count: number, token_id: any }[]) {
    if (!!tokenList) {
      tokenList.forEach(token => {
        this.materials.find(x => x.token_id == token.token_id).count += token.count;
      })
      this.callEvent(UserAction.setToken, true, tokenList);
    }
  }
  async refundToken(data: { count: number, token_id: number }[]): Promise<void> {
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
