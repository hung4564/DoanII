import { IPlayer } from '@interface/iplayer'

import { Token } from '@model/token';
import { Card } from '@model/card';
import { materials } from '@data/token';
export class Board {
  listPlayer: IPlayer[];
  tokensCount: number[] = [5, 7, 7, 7, 7, 7];
  materials: Token[] = materials;
  card1s: Array<Card>;
  constructor(list: IPlayer[]) {
    this.listPlayer = list;
  }
}