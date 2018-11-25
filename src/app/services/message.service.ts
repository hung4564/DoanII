import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '@model/message';
declare var jQuery: any;
declare var $: any;

@Injectable()
export class MessageService {
  public displayTime = 3000;
  constructor() {
    $.notifyDefaults({
      type: 'danger',
      delay: this.displayTime,
      z_index: 9999,
      animate: {
        enter: 'animated bounceInRight',
        exit: 'animated bounceOutRight'
      }
    });
  }
  notice(message: Message) {
    jQuery.notify({
      message: message.content,
      type: message.style
    })

  }

}
