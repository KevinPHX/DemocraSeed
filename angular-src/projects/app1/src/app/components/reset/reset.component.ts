import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { HttpClient } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
password:String;
href: String;
token: String;
  constructor(
    private authService:AuthService,
    private validateService:ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href)
    this.token = this.href.substring(12,52);
    console.log(this.token);
    this.authService.findUsers().subscribe((data: any) => {
      for (var i =0; i < data.length; i++){
        if (this.token == data[i].resetPasswordToken){
          console.log(data[i])
        }
      }
    })
  }


  onResetSubmit(){

    const user = {
      password:this.password
    }
    if (user.password == undefined || user.password == ""){
      this.flashMessage.show("Please type in a new password",{
        cssClass: "alert-danger",
        timeout:5000
      });
      return false
    }
    this.href = this.router.url;
    console.log(this.href)
    this.token = this.href.substring(12,52);
    console.log(this.token);

    this.authService.resetUser(this.token, user).subscribe((data: any) => {
      if(data.success){
        this.flashMessage.show(data.msg,{
          cssClass: "alert-success",
          timeout:5000
        });
        this.router.navigate(['/app1/login'])
      } else {
        this.flashMessage.show(data.msg,{
          cssClass: "alert-danger",
          timeout:5000
        });
        this.router.navigate(['/app1/reset/' + this.token])
      }


    })

  }

}
