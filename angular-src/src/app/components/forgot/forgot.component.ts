import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { NgFlashMessageService } from "ng-flash-messages"
import { ValidateService } from '../../services/validate.service';
import {Data} from "../../Data";
import { FlashMessagesService } from 'angular2-flash-messages';

// import {SimpleModalComponent} from "ngx-simple-modal";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
email:String;
Data:Data[];
  constructor(
  private authService:AuthService,
  private validateService:ValidateService,
  private router:Router,
  private flashMessage:FlashMessagesService
) { }

  ngOnInit() {
    this.authService.findUsers().subscribe((Data: any) => {
      for (var i =0; i < Data.length; i++){
        //if (user.email !== Data[i].email){
        console.log(Data[i].email)
        }
  })
}

  onForgotSubmit(){
    const user = {
      email: this.email
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please use a valid email",{
        cssClass: "alert-success",
        timeout:5000
      });
      return false;
    }
    this.authService.forgotUser(user).subscribe((data: any) => {
      if(data.success){
        document.getElementById("openModalButton").click();
      } else {
        this.flashMessage.show(data.msg,{
          cssClass: "alert-danger",
          timeout:5000
        });
      }

    });
  //   this.authService.findUsers().subscribe((Data: any) => {
  //     for (var i =0; i < Data.length; i++){
  //       if (user.email == Data[i].email){
  //         this.authService.forgotUser(user).subscribe((data: any) => {
  //           if(data.success){
  //             this.flashMessage.show(data.msg,{
  //               cssClass: "alert-success",
  //               timeout:5000
  //             });
  //             document.getElementById("openModalButton").click();
  //           } else {
  //             this.flashMessage.show("Something went wrong",{
  //               cssClass: "alert-danger",
  //               timeout:5000
  //             });
  //           }
  //
  //         });
  //         i = Data.length+1;
  //       }
  //       if (i == Data.length -1 && user.email !== Data[i].email) {
  //         this.flashMessage.show("Please enter the email you registered with",{
  //           cssClass: "alert-danger",
  //           timeout:5000
  //         });
  //         return false;
  //       }
  //     }
  //
  // })






  }

}
