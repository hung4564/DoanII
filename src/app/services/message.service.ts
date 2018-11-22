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

  showWarningMessage(message, ele?) {
    jQuery.notify({
      message: message,
      icon: 'fa fa-check'
    },{
      type: 'warning',
      animate: {
        enter: 'animated bounceInRight',
        exit: 'animated bounceOutRight'
      },
      z_index: 99999,
    });
  }

  showErrMessage(message, ele?) {
    jQuery.notify({
      message: message,
      icon: 'fa fa-exclamation-triangle'
    },{
      type: 'danger',
      animate: {
        enter: 'animated wobble',
        exit: 'animated bounceOutRight'
      },
      z_index: 99999,
    });
  }

  showErrorMessage(elementID, error?) {
    var element = 'body';
    var errorMessage;
    let controller = this;
    try {
      errorMessage = error ? error.json().message
        || "Some errors happened with our server. Please try again later"
        : "Some errors happened with our server. Please try again later"
    }
    catch (err) {
      errorMessage = "Some errors happened with our server. Please try again later";
    }
    finally {
      jQuery.notify({
        message: errorMessage,
        icon: 'fa fa-exclamation-triangle'
      },{
        type: 'danger',
        animate: {
          enter: 'animated wobble',
          exit: 'animated bounceOutRight'
        },
        z_index: 99999,
      });
    }
  }

  createErrorMessage(elementID, message) {
    jQuery.notify({
      message: message,
      icon: 'fa fa-exclamation-triangle'
    },{
      type: 'danger',
      animate: {
        enter: 'animated wobble',
        exit: 'animated bounceOutRight'
      },
      z_index: 99999,
    });
  }

  private show(element, appendElement) {
    jQuery(element).append(appendElement);
    jQuery("#kkk").addClass("show");
    setTimeout(function () {
      jQuery("#kkk").removeClass("show");
    }, this.displayTime)
  }

  public createTipMessage(message, dtime?) {
    var element = 'body';
    let controller = this;
    let popup = document.createElement('div');
    jQuery(element).append(jQuery(popup));
    jQuery(popup).attr('id', 'warningMSSZ');
    jQuery(popup).addClass('snackbar-small warning');
    jQuery(popup).html(message);
    var time = dtime ? dtime : controller.displayTime;
    setTimeout(function () {
      jQuery(popup).removeClass('show');
      jQuery(popup).remove();
    }, time);
  }
}
