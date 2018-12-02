
import { IPlayer, TypePlayer, UserAction } from './iplayer';
export class UserPlayer extends IPlayer {

  constructor(name?, img?) {
    super(name, img);
    this.type = TypePlayer.UserPlayer;
    this.name = name ? name : "User Player";
  }
  protected needRefunToken(count_need_remove: number) {
    super.needRefundToken(count_need_remove);
    this.callEvent(UserAction.needrefundToken, true);
  }
}
