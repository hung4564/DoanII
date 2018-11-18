import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user-service.service';
import { UserPlayer } from '@model/Userplayer';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})
export class MainlayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
