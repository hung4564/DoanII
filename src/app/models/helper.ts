import { materials } from "@data/token";

export class Helper {
  public static randomIntFromInterval(min, max) // min and max included
  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public static randomTokenId(except: number[] = []) {
    let token_id: number
    except.sort((x, y) => x - y);
    if (this.arr_diff(except, [1, 2, 3, 4, 5]).length == 0) {
      return -1
    }
    if (this.arr_diff(except, [0, 1, 2, 3, 4, 5]).length == 0) {
      return -1
    }
    do {
      token_id = this.randomIntFromInterval(1, 5);
    }
    while (except.includes(token_id));
    return token_id;
  }
  public static randomToken(except: number[] = []) {
    return materials.find(x => x.id === this.randomTokenId(except));
  }
  static async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  static arr_diff(a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }

    for (var k in a) {
      diff.push(k);
    }

    return diff;
  }
  static copy(value) {
    return JSON.parse(JSON.stringify(value));
  }
}