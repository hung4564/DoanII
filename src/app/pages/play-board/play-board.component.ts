import { Component, OnInit } from '@angular/core';

import { Token } from '@model/token';
import { Card } from '@model/card';
import { materials } from '@data/token';
@Component({
  selector: 'app-play-board',
  templateUrl: './play-board.component.html',
  styleUrls: ['./play-board.component.css']
})
export class PlayBoardComponent implements OnInit {
  constructor() { }
  tokensCount: number[] = [5, 7, 7, 7, 7, 7];
  materials: Token[] = materials;
  card1s: Array<Card>
  ngOnInit() {
  }

}
