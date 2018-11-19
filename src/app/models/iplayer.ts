
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
    if (!this.canBuy(card)) {
      return;
    }
    console.log(this.canBuy(card));
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
    if (!this.canHold()) {
      return;
    }
    console.log('user hold card');
    let token = this.materials.find(x => x.token.id == 0);
    token.count++;
    this.listHoldCard.push(card);
  }
  canHold() {
    //moi nguoi khong the dc giu qua 3 the hay 3 dong vang
    return this.materials.find(x => x.token.id == 0).count <= 3 || this.listHoldCard.length <= 3
  }
  canBuy(card: Card): boolean {
    let count_need: number = 0; // gia tri can bu 
    card.price.forEach((item, index) => {
      let material = this.materials.find(x => x.token.id == item.token.id);
      let product = this.product.find(x => x.token.id == item.token.id);
      let difference_count = item.count - (material.count + product.count);
      //neu chenh lenh nho hon => can bu von, khong thi khong can
      count_need = count_need + difference_count > 0 ? difference_count : 0
    })
    //neu nhu bu < von => co the mua
    return (count_need <= this.materials.find(x => x.token.id == 0).count);
  }
}
