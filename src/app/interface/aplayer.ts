
import { materials, foods } from '@data/token';
import { Token } from '@angular/compiler';
export abstract class APlayer {
  name: string;
  img: string;
  materials: { count: number, token: any }[] = [];
  foods: { count: number, token: any }[] = [];
  constructor(name?, img?) {
    this.img = img ? img : 'assets/img/user.png';
    this.name = name ? name : 'test name';
    materials.forEach((item, index) => {
      this.materials[index] = { count: 0, token: item };
    })
    foods.forEach((item, index) => {
      this.foods[index] = { count: 0, token: item };
    })
  }
}
