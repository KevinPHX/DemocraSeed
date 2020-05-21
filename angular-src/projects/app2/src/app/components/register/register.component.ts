import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname: String;
  lastname: String;
  username: String;
  email: String;
  password: String;
  agreement: Boolean;
  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user={
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password,
      }
      this.authService.findMentors().subscribe((Data: any) => {
      // if(!this.validateService.validateRegister(user)){
      //   // this.flashMessages.showFlashMessage({messages: ["Please fill in all fields"], dismissible: false, timeout:3000, type:'danger'});
      //   return false;
      // }
      if(!this.agreement) {
        console.log(this.agreement)
        // this.flashMessages.showFlashMessage({messages: ["Please indicate that you accept the Terms and Conditions"], dismissible: false, timeout:3000, type:'danger'});
        return false;
      }
      if(!this.validateService.validateEmail(user.email)){
        // this.flashMessages.showFlashMessage({messages: ["Please use a valid email"], dismissible: false, timeout:3000, type:'danger'});
        return false;
      }
      for (var i = 0; i < Data.length; i++){
          if (user.email == Data[i].email){
            // this.flashMessages.showFlashMessage({messages: ["Please use a different email"], dismissible: false, timeout:3000, type:'danger'});
            this.router.navigate(['/app2/register'])
            return false;
          }
        }
          for (var j = 0; j < Data.length; j++){
          if (user.username == Data[j].username){
            // this.flashMessages.showFlashMessage({messages: ["Please use a different username"], dismissible: false, timeout:3000, type:'danger'});
            this.router.navigate(['/app2/register'])
            return false;
          }
        }





        // this.flashMessages.show("Check your email to verify account", {cssClass:'alert-success', timeout:10000});
        // this.router.navigate(['/login'])


      //Register User
      this.authService.registerUser(user).subscribe((data: any) => {
        if(data.success){
           // this.flashMessages.showFlashMessage({messages: ["Check your email to verify account"], dismissible: false, timeout:3000, type:'success'});
           document.getElementById("openModalButton").click();
        } else {
          // this.flashMessages.showFlashMessage({messages: ["Something went wrong"], dismissible: false, timeout:3000, type:'danger'});
          this.router.navigate(['/app2/register'])
        }
      });


    })







  }

}
