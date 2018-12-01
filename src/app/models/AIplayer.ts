import { IPlayer, TypePlayer } from '@model/iplayer';
import { Card } from './card';
export class AIPlayer extends IPlayer {

  constructor(name?, img?) {
    super(name, img);
    this.type = TypePlayer.AiPlayer;
    this.name = name ? name : "Cpu Player";
  }
  startTurn(cardsListInBoard: { level: number, count: number, list: Card[] }[], materialsLeftInBoard: { count: number, token_id: any }[]) {
    super.startTurn(cardsListInBoard, materialsLeftInBoard);
    
  }
}
