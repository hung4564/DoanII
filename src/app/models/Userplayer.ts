
import { IPlayer, TypePlayer } from './iplayer';
export class UserPlayer extends IPlayer {

  constructor(name?, img?) {
    super(name, img);
    this.type = TypePlayer.UserPlayer;
    this.name = name ? name : "User Player";
  }
}
