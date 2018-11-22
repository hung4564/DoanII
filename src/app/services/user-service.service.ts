import { Injectable } from '@angular/core';
import { UserPlayer } from '@model/Userplayer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserPlayer;
  public isLogin() {
    return !!this.user
  }
  constructor() { }
}
