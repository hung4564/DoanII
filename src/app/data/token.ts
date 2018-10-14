import { Token } from '../models/token'


export const materials: Token[] = [
  new Token(1, 'Cow', 'c0392b', { name: 'cow', type: 'material' }),
  new Token(3, 'Fish', '2980b9', { name: 'fish', type: 'material' }),
  new Token(2, 'Egg', 'ffffff', { name: 'eggs', type: 'material' }),
  new Token(4, 'Wheat', '000000', { name: 'wheat', type: 'material' }),
  new Token(5, 'Cheese', 'f39c12', { name: 'cheese', type: 'material' }),
  new Token(0, 'Salt shaker', '7f8c8d', { name: 'salt-shaker', type: 'material' }),
]
export const foods: Token[] = [
  new Token(1, 'Hamburger', 'c0392b', { name: 'hamburger', type: 'food' }),
  new Token(2, 'taco', 'ffffff', { name: 'taco', type: 'food' }),
  new Token(3, 'pizza', '2980b9', { name: 'pizza', type: 'food' }),
  new Token(4, 'bread', '000000', { name: 'bread', type: 'food' }),
  new Token(5, 'restaurant', 'f39c12', { name: 'restaurant', type: 'food' }),
  new Token(0, 'service-bell', '7f8c8d', { name: 'service-bell', type: 'material' }),
]