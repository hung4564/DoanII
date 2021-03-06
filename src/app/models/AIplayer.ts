import { IPlayer, TypePlayer, UserAction } from '@model/iplayer';
import { Card } from './card';
import { Helper } from './helper';
import { ListToken } from './token';
class Target {
  card: Card;
  tokenDifference: ListToken[];
  countDIfference: number;
}
export class AIPlayer extends IPlayer {
  _targetInfo: Target;
  constructor(name?, img?) {
    super(name, img);
    this.type = TypePlayer.AiPlayer;
    this.name = name ? name : "Cpu Player";
  }
  private _cardsListInBoard: { level: number, count: number, list: Card[] }[] = [];
  private _materialsLeftInBoard: ListToken[] = [];
  startTurn(cardsListInBoard: { level: number, count: number, list: Card[] }[], materialsLeftInBoard) {
    let user = this;
    super.startTurn(cardsListInBoard, materialsLeftInBoard);
    user._cardsListInBoard = cardsListInBoard;
    user._materialsLeftInBoard = materialsLeftInBoard;
    Helper.delay(2000).then(() => {
      user.settingAction().then(() => {
      })

    })
  }
  private async settingAction(): Promise<void> {
    let user = this;
    let count = user.materials.concat(user.product).filter(x => x.token_id > 0).map(x => x.count).reduce((pre, next) => pre + next);
    user.settingTargetCard(count).then((result: Target) => {
      user._targetInfo = result;
      Helper.delay(1000).then(() => {
        this.checkTarget().then();
      })
    });
  }
  private async checkTarget() {
    let user = this;
    user.checkDifferenceValue(user._targetInfo.card).then(value => {
      user._targetInfo.countDIfference = value.count;
      user._targetInfo.tokenDifference = value.data;
      Helper.delay(1000).then(() => {
        if (user._targetInfo.countDIfference == 0) {
          user.buyInList(user._targetInfo.card).then(result => { });
        }
        else {
          user.settingToken(user._targetInfo.tokenDifference).then(result => {
            user.setToken(result).then();
          })
        }
      })

    })
  }
  private async settingTargetCard(count_had: number): Promise<Target> {
    let user = this;
    let level_can_get = count_had <= 5 ? 0 : (count_had < 8 ? 1 : 2)
    let listardLists = user._cardsListInBoard.filter(x => x.level <= level_can_get && x.count > 0);
    let min_card: number = -1;
    let temp: { count: number, data: ListToken[] };
    let targe: Target = new Target;
    listardLists.forEach(cardLists => {
      if (cardLists.count > 0) {
        cardLists.list.forEach(element => {
          user.checkDifferenceValue(element).then(value => {
            temp = value;
            if (min_card == -1 || min_card > temp.count) {
              targe.card = element;
              targe.tokenDifference = temp.data;
              targe.countDIfference = temp.count;
              min_card = temp.count
            }
          })
        });
      }

    })

    return targe;
  }
  async checkDifferenceValue(card: Card): Promise<{ count: number, data: ListToken[] }> {
    let data: { count: number, data: ListToken[] } = { count: 0, data: [] }
    let material: ListToken;
    let product: ListToken;
    let difference_count: number = 0;
    let count_need: number = 0; // gia tri can bu 
    card.price.forEach((item, index) => {
      material = this.materials.find(x => x.token_id == item.token_id);
      product = this.product.find(x => x.token_id == item.token_id);
      difference_count = item.count - (material.count + product.count);
      if (difference_count > 0) {
        let difference_item = { count: difference_count, token_id: item.token_id }
        data.data.push(difference_item);
      }
      count_need = count_need + (difference_count > 0 ? difference_count : 0)
    })
    data.count = count_need;
    return data;
  }
  needRefundToken(count_need_remove: number) {
    let user = this;
    super.needRefundToken(count_need_remove);
    user.settingRefund(count_need_remove).then(data => {
      user.refundToken(data).then();
    })
  }
  private async settingRefund(count_need_remove: number): Promise<ListToken[]> {
    let user = this;
    let token_id_remove: number;
    let except_list = user.materials.filter(x => x.count == 0 || x.token_id == 0).map(x => x.token_id);
    let list_refund: ListToken[] = [];
    for (let i = 0; i < count_need_remove; i++) {
      token_id_remove = Helper.randomTokenId(except_list);
      let item = list_refund.find(x => x.token_id == token_id_remove);
      if (!!item) {
        item.count++;
      }
      else {
        list_refund.push({ count: 1, token_id: token_id_remove })
      }
      except_list = user.materials.filter(x => x.count == 0 || x.token_id == 0).map(x => x.token_id);
    }
    return list_refund;
  }
  private async settingToken(needToken: ListToken[] = []): Promise<ListToken[]> {
    let user = this;
    //lay nguyen lieu
    let except_list = user._materialsLeftInBoard.filter(x => x.count == 0).map(x => x.token_id);
    except_list.push(0);
    let get_count = 3
    let get_list: ListToken[] = []
    if (needToken.length > 0) {
      needToken.forEach((value, index) => {
        let token = user._materialsLeftInBoard.find(x => x.token_id == value.token_id)
        if (token.count > 0 && get_count > 0) {
          if (token.count > 4 && value.count > 1) {
            get_count = 0;
            get_list = [{ count: 2, token_id: value.token_id }];
          }
          else {
            get_list.push({ count: 1, token_id: value.token_id });
            get_count--;
            except_list.push(value.token_id);
          }
        }
      })
    }
    for (let i = 0; i < get_count; i++) {
      let token_id = Helper.randomTokenId(except_list);
      if (token_id > 0) {
        get_list.push({ count: 1, token_id: token_id });
        except_list.push(token_id);
      } else {
        return get_list;
      }
    }
    return get_list;
  }
}
