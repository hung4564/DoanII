
import { materials } from '@data/token';
import { Token } from '@angular/compiler';
import { Card } from './card';
import { LiteEvent } from './LiteEvent';
import { Nobletile } from './nobletile'; export class IPlayer {
  id: number;
  name: string;
  img: string;
  materials: { count: number, token_id: number }[] = [];
  product: { count: number, token_id: number }[] = [];
  listCard: Card[];
  listHoldCard: Card[];
  listNobletile: Nobletile[];
  IsMyTurn: boolean;
  public get point() {
    let point = 0;
    if (this.listCard.length > 0) {
      point += this.listCard.map(item => item.value.point).reduce((prev, next) => prev + next)
    }
    if (this.listNobletile.length > 0) {
      point += this.listNobletile.map(item => item.value.point).reduce((prev, next) => prev + next)
    }
    return 15+this.id;
  }
  //event
  private readonly _eventBuyCard = new LiteEvent();
  public get eventBuyCard() { return this._eventBuyCard.expose(); }

  private readonly _eventHoldCard = new LiteEvent();
  public get eventHoldCard() { return this._eventHoldCard.expose(); }

  private readonly _eventSetToken = new LiteEvent();
  public get eventSetToken() { return this._eventSetToken.expose(); }
  private readonly _eventRefundToken = new LiteEvent();
  public get eventRefundToken() { return this._eventRefundToken.expose(); }


  constructor(name?, img?) {
    this.img = img ? img : 'assets/img/user.png';
    this.name = name ? name : 'test name';
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
  buyCard(card: Card) {
    if (!this.canBuy(card)) {
      return false;
    }
    console.log('user buy card');
    card.price.forEach((item, index) => {
      let material = this.materials.find(x => x.token_id == item.token_id);
      let product = this.product.find(x => x.token_id == item.token_id);
      material.count = material.count - item.count + product.count;
    })
    this.product.find(x => x.token_id == card.value.token_id).count++;
    this.listCard.push(card);
    this._eventBuyCard.trigger({ action: 'buy', user_id: this.id });
    return true;
  }
  holdCard(card: Card) {
    if (!this.canHold()) {
      return false;
    }
    console.log('user hold card');
    let token = this.materials.find(x => x.token_id == 0);
    token.count++;
    this.listHoldCard.push(card);
    this._eventHoldCard.trigger({ action: 'buy', user_id: this.id });
    return true;
  }
  canHold() {
    //moi nguoi khong the dc giu qua 3 the hay 3 dong vang
    return this.materials.find(x => x.token_id == 0).count < 3 || this.listHoldCard.length < 3
  }
  canBuy(card: Card): boolean {
    if (!!card) {
      let count_need: number = 0; // gia tri can bu 
      card.price.forEach((item, index) => {
        let material = this.materials.find(x => x.token_id == item.token_id);
        let product = this.product.find(x => x.token_id == item.token_id);
        let difference_count = item.count - (material.count + product.count);
        //neu chenh lenh nho hon => can bu von, khong thi khong can
        count_need = count_need + difference_count > 0 ? difference_count : 0
      })
      //neu nhu bu < von => co the mua
      return (count_need <= this.materials.find(x => x.token_id == 0).count);
    }
    return false;
  }
  setToken(tokenList: { count: number, token_id: any }[]) {
    if (!!tokenList) {
      tokenList.forEach(token => {
        this.materials.find(x => x.token_id == token.token_id).count += token.count;
      })
      let count = this.materials.map(item => item.count).reduce((prev, next) => prev + next);
      if (count >= 10) {
        this._eventRefundToken.trigger({ data: count });
      }
      else {
        this._eventSetToken.trigger();
      }
    }
  }
  refundToken() {

  }
  setNobletile(nobletiles: Nobletile) {
    this.listNobletile.push(nobletiles);
  }
}
