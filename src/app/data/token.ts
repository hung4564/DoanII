import { Token } from '../models/token'


export const materials: Array<Token> = [
  { id: 1, name: 'Cow', color: 'c0392b', imgInfo: { name: 'cow', type: 'material' } },
  { id: 2, name: 'Egg', color: 'ffffff', imgInfo: { name: 'eggs', type: 'material' } },
  { id: 3, name: 'Fish', color: '2980b9', imgInfo: { name: 'fish', type: 'material' } },
  { id: 4, name: 'Wheat', color: '000000', imgInfo: { name: 'wheat', type: 'material' } },
  { id: 5, name: 'Cheese', color: 'f39c12', imgInfo: { name: 'cheese', type: 'material' } },
  { id: 0, name: 'Salt shaker', color: '7f8c8d', imgInfo: { name: 'salt-shaker', type: 'material' } },
]
export const foods: Token[] = [
  { id: 1, name: 'Hamburger', color: 'c0392b', imgInfo: { name: 'hamburger', type: 'food' } },
  { id: 2, name: 'taco', color: 'ffffff', imgInfo: { name: 'taco', type: 'food' } },
  { id: 3, name: 'pizza', color: '2980b9', imgInfo: { name: 'pizza', type: 'food' } },
  { id: 4, name: 'bread', color: '000000', imgInfo: { name: 'bread', type: 'food' } },
  { id: 5, name: 'restaurant', color: 'f39c12', imgInfo: { name: 'restaurant', type: 'food' } },
  { id: 0, name: 'service-bell', color: '7f8c8d', imgInfo: { name: 'service-bell', type: 'material' } },
]