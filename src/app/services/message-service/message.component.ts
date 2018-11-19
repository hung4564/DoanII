import {Component, OnInit, OnDestroy} from '@angular/core';
import {MessageService} from "./message.service";
//import {NgClass} from "@angular/common";
declare var jQuery;

export class MessageType {
  static Success:"Success";
  static Error:"Error";
}

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  providers : [MessageService]
  //directives: [NgClass]
})
export class MessageComponent implements OnInit, OnDestroy {
  subscription:any;
  public message:string;
  public isError:boolean;
  public isSucces:boolean;

  constructor( public messageService:MessageService) {

  }

  ngOnInit() {
    this.subscription = this.messageService.triggerEvent
      .subscribe(item => {
        this.message = item["message"];
        if (item["type"] === "Error") {
          this.isError = true;
          this.isSucces = false;
        }
        if (item["type"] === "Success") {
          this.isSucces = true;
          this.isError = false;
        }
          this.show();
      });
  }

  show() {
   
    jQuery(".snackbar").addClass("show");
    setTimeout(function () {
      jQuery(".snackbar").removeClass("show");
    },3000)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
