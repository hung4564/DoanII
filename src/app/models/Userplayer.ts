import { APlayer } from '@interface/aplayer'
import { IPlayer } from '@interface/iplayer';
export class UserPlayer extends APlayer implements IPlayer {
  constructor(name?, img?) {
    super(name, img);
  }
}
