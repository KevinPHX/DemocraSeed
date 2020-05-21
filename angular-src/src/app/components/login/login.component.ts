import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { NgFlashMessageService } from "ng-flash-messages"
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    // private flashMessages:NgFlashMessageService
  ) { }

  ngOnInit() {
    console.log(this.authService.loggedIn())
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe((data: any) => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        // this.flashMessages.showFlashMessage({messages: ["You are now logged in"], dismissible: false, timeout:5000, type:'success'})
        this.flashMessage.show("You are now logged in",{
          cssClass: "alert-success",
          timeout:5000
        });
        console.log(data.token)
        this.router.navigate(['/dashboard'])
      } else {
        // this.flashMessages.showFlashMessage({messages: [data.msg], dismissible: false, timeout:5000, type:'danger'})
        this.flashMessage.show(data.msg,{
          cssClass: "alert-danger",
          timeout:5000
        });
        this.router.navigate(['/login'])
      }
    });
  }

}
