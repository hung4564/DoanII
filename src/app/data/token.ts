import { Token } from '../models/token'
import { Card } from '@model/card';
import { Nobletile } from '@model/nobletile';


export const materials: Token[] = [
  new Token(0, 'Salt shaker', '7f8c8d', { name: 'salt-shaker', type: 'material' }),
  new Token(1, 'Cow', 'c0392b', { name: 'cow', type: 'material' }),
  new Token(3, 'Fish', '2980b9', { name: 'fish', type: 'material' }),
  new Token(2, 'Egg', 'ffffff', { name: 'eggs', type: 'material' }),
  new Token(4, 'Wheat', '000000', { name: 'wheat', type: 'material' }),
  new Token(5, 'Cheese', 'f39c12', { name: 'cheese', type: 'material' }),
]
export const foods: Token[] = [
  new Token(0, 'service-bell', '7f8c8d', { name: 'service-bell', type: 'food' }),
  new Token(1, 'Hamburger', 'c0392b', { name: 'hamburger', type: 'food' }),
  new Token(2, 'taco', 'ffffff', { name: 'taco', type: 'food' }),
  new Token(3, 'pizza', '2980b9', { name: 'pizza', type: 'food' }),
  new Token(4, 'bread', '000000', { name: 'bread', type: 'food' }),
  new Token(5, 'restaurant', 'f39c12', { name: 'restaurant', type: 'food' }),
]
export const nobletiles: Nobletile[] = [
  new Nobletile(0, { point: 3 }, [{ count: 4, token_id: 1 }, { count: 4, token_id: 2 }, { count: 4, token_id: 3 }]),

  new Nobletile(1, { point: 3 }, [{ count: 5, token_id: 1 }, { count: 4, token_id: 2 }, { count: 4, token_id: 3 }]),

  new Nobletile(2, { point: 3 }, [{ count: 4, token_id: 1 }, { count: 4, token_id: 2 }, { count: 4, token_id: 3 }]),

  new Nobletile(3, { point: 3 }, [{ count: 4, token_id: 1 }, { count: 4, token_id: 2 }, { count: 4, token_id: 3 }]),
]