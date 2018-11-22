
import { IPlayer } from './iplayer';
export class UserPlayer extends IPlayer {

  constructor(name?, img?) {
    super(name, img);
    console.log(this.name);
  }
}
