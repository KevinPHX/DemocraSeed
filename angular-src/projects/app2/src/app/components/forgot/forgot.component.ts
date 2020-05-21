import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  email:String;

  constructor(
    private authService:AuthService,
    private validateService:ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.findMentors().subscribe((Data: any) => {
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
      console.log(data)
      if(data.success){
        document.getElementById("openModalButton").click();
      } else {
        this.flashMessage.show(data.msg,{
          cssClass: "alert-danger",
          timeout:5000
        });
      }

    });

  }

}
