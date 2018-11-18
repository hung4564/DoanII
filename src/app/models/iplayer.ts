
import { materials, foods } from '@data/token';
import { Token } from '@angular/compiler';
import { Card } from './card';
export class IPlayer {
  name: string;
  img: string;
  materials: { count: number, token: any }[] = [];
  product: { count: number, token: any }[] = [];
  listCard: Card[];
  listHoldCard: Card[];
  constructor(name?, img?) {
    this.img = img ? img : 'assets/img/user.png';
    this.name = name ? name : 'test name';
    this.listCard = [];
    this.listHoldCard = [];
    materials.forEach((item, index) => {
      this.materials.push({ count: 0, token: item });
    })
    materials.forEach((item, index) => {
      this.product.push({ count: 0, token: item });
    })
  }
  buyCard(card: Card) {
    console.log('user buy card');
    card.price.forEach((item, index) => {
      let material = this.materials.find(x => x.token.id == item.token.id);
      let product = this.product.find(x => x.token.id == item.token.id);
      material.count = material.count - item.count + product.count;
    })
    this.product.find(x => x.token.id == card.value.token.id).count++;
    this.listCard.push(card);
  }
  holdCard(card: Card) {
    console.log('user hold card');
    let token = this.materials.find(x => x.token.id == 0);
    token.count++;
    this.listHoldCard.push(card);
  }
}
