import { Token } from './token';
import { materials, foods } from '@data/token';
export class Player {
  img: string;
  name:string;
  materials=[];
  foods=[];
  constructor(name?,img?) {
    this.img = img ? img : 'assets/img/user.png';
    materials.forEach((item, index) => {
      this.materials[index] = { count: 0, material: item };
    })
    foods.forEach((item, index) => {
      this.foods[index] = { count: 0, material: item };
    })
  }
}
