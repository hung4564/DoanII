import { Injectable, EventEmitter } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Injectable()
export class MessageService {
  public triggerEvent = new EventEmitter();
  public displayTime = 3000;

  showSuccessMessage(message, ele?) {
    jQuery.notify({
      message: message,
      icon: 'fa fa-check'
    },{
      type: 'success',
      animate: {
        enter: 'animated bounceInRight',
        exit: 'animated bounceOutRight'
      },
      z_index: 99999,
    });
  }

 
}
