import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Config } from 'ngx-countdown/src/interfaces';
import { Size } from '@model/Size';
import { CountdownComponent } from 'ngx-countdown';
declare var jQuery: any;

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlipCountdownComponent implements OnInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  config: Config

  @Input('size-comp') size: Size;
  @Input('config-comp') addConfig: Config;
  @Output('start') start = new EventEmitter<any>();

  @Output('finished') finished = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit() {
    this.config = {
      leftTime: this.addConfig.leftTime,
      repaint: function () {
        const me: any = this;
        let content: string;

        me.hands.forEach((hand: any) => {
          if (hand.lastValue !== hand.value) {
            content = '';
            const cur = me.toDigitals(hand.value + 1, hand.bits).join(''),
              next = me.toDigitals(hand.value, hand.bits).join('');

            hand.node.innerHTML = `
              <span class="count curr top">${cur}</span>
              <span class="count next top">${next}</span>
              <span class="count next bottom">${next}</span>
              <span class="count curr bottom">${cur}</span>
            `;
            hand.node.parentElement.className = 'time';
            setTimeout(() => {
              hand.node.parentElement.className = 'time flip';
            });
          }
        });
      },
    };
    let count = jQuery('.flip-cd .time');
    count.css("fontSize", (this.size.width - 4) / 8);
    count.width((this.size.width - 4) / 8 * 4);
    count.height((this.size.width - 4) / 8 * 6)
  }
  onStart() {
    this.start.emit();
  }
  onFinished() {
    this.finished.emit();
  }
  restart() { this.counter.restart(); }
  stop() { this.counter.stop(); }
  pause() { this.counter.pause(); }
  resume() { this.counter.resume(); }

}
