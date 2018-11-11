import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@model/card';
@Component({
  selector: 'card-comp',
  templateUrl: './card-comp.component.html',
  styleUrls: ['./card-comp.component.css']
})
export class CardCompComponent implements OnInit {

  @Input() card: Card;
  constructor() { }

  ngOnInit() {
  }

}
