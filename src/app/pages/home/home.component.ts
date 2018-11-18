import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user-service.service';
import { UserPlayer } from '@model/Userplayer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.user = new UserPlayer();
  }
  play() {
    this.router.navigate(['/play'])
  }
  about() {
    this.router.navigate(['/about'])
  }

}
