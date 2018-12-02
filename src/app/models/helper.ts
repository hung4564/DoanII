import { materials } from "@data/token";

export class Helper {
  public static randomIntFromInterval(min, max) // min and max included
  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  public static randomTokenId(except: number[] = []) {
    let token_id
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
}