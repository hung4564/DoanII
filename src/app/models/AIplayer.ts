import { IPlayer, TypePlayer } from '@model/iplayer';
export class AIPlayer extends IPlayer {

  constructor(name?, img?) {
    super(name, img);
    this.type = TypePlayer.AiPlayer;
    this.name = name ? name : "Cpu Player";
  }
}
