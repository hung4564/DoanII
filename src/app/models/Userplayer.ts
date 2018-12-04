
import { IPlayer, TypePlayer, UserAction } from './iplayer';
import { Card } from './card';
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
  async buyInList(card: Card): Promise<boolean> {
    return super.buyInList(card).then(result => {
      if (result) {

      }
      else {
        this.callEvent(UserAction.buyInList, false);
      }
      return result;
    })
  }
  async holdCard(card: Card): Promise<boolean> {
    return super.holdCard(card).then(result => {
      if (result) {

      }
      else {
        this.callEvent(UserAction.holdCard, false);
      }
      return result;
    })
  }
  async buyHoldCard(card: Card): Promise<boolean> {
    return super.buyHoldCard(card).then(result => {
      if (result) {

      }
      else {
        this.callEvent(UserAction.buyHold, false);
      }
      return result;
    })
  }
}
