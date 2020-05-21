import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
// import { NgFlashMessageService } from "ng-flash-messages"
import { Router } from '@angular/router';
// import { SimpleModalComponent } from "ngx-simple-modal";
// import {ModalManager} from "ngb-modal";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  groupname: String;
  advisorfirstname: String;
  advisorlastname: String;
  username: String;
  advisoremail: String;
  password: String;
  cityname: String;
  memberlist = [{memberfirstname: "", memberlastname: "", memberemail:""}]
  agreement: any;
  constructor(
    private validateService: ValidateService,
    // private flashMessages:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    // private modal:SimpleModalService
  ) { }

  ngOnInit() {
  }
onRegisterSubmit(){
  const user={
    groupname: this.groupname,
    advisorfirstname: this.advisorfirstname,
    advisorlastname: this.advisorlastname,
    username: this.username,
    advisoremail: this.advisoremail,
    password: this.password,
    cityname: this.cityname,
    memberlist: this.memberlist
    }
    console.log(user)
    this.authService.findUsers().subscribe((Data: any) => {
      console.log(Data)
    // if(!this.validateService.validateRegister(user)){
    //   // this.flashMessages.showFlashMessage({messages: ["Please fill in all fields"], dismissible: false, timeout:3000, type:'danger'});
    //   return false;
    // }
    // if(!this.agreement) {
    //   console.log(this.agreement)
    //   // this.flashMessages.showFlashMessage({messages: ["Please indicate that you accept the Terms and Conditions"], dismissible: false, timeout:3000, type:'danger'});
    //   return false;
    // }
    if(!this.validateService.validateEmail(user.advisoremail)){
      console.log("invalid email")
      // this.flashMessages.showFlashMessage({messages: ["Please use a valid email"], dismissible: false, timeout:3000, type:'danger'});
      return false;
    }
    for (var i = 0; i < Data.length; i++){
      console.log("verify email")
        if (user.advisoremail == Data[i].advisoremail){
          // this.flashMessages.showFlashMessage({messages: ["Please use a different email"], dismissible: false, timeout:3000, type:'danger'});
          this.router.navigate(['/register'])
          console.log("nonunique email")
          return false;
        }
      }
        for (var j = 0; j < Data.length; j++){
          console.log("verify username")
        if (user.username == Data[j].username){
          // this.flashMessages.showFlashMessage({messages: ["Please use a different username"], dismissible: false, timeout:3000, type:'danger'});
          this.router.navigate(['/register'])
          console.log("nonunique username")
          return false;
        }
      }





      // this.flashMessages.show("Check your email to verify account", {cssClass:'alert-success', timeout:10000});
      // this.router.navigate(['/login'])

      console.log('here1')

    //Register User
    this.authService.registerUser(user).subscribe((data: any) => {
      console.log('here')
      console.log(data)
      if(data.success){
         // this.flashMessages.showFlashMessage({messages: ["Check your email to verify account"], dismissible: false, timeout:3000, type:'success'});
         document.getElementById("openModalButton").click();
      } else {
        // this.flashMessages.showFlashMessage({messages: ["Something went wrong"], dismissible: false, timeout:3000, type:'danger'});
        this.router.navigate(['/register'])
      }
    });


  })



}


add() {
  for (var i = 0; i < this.memberlist.length; i++){
    var memberfirstname = this.memberlist[i].memberfirstname
    var memberlastname = this.memberlist[i].memberlastname
    var memberemail = this.memberlist[i].memberemail
    this.memberlist.splice(i, 1, {memberfirstname: memberfirstname, memberlastname: memberlastname, memberemail:memberemail});
  }
  this.memberlist.splice(this.memberlist.length, 1, {memberfirstname: "", memberlastname: "", memberemail:""});
  console.log(this.memberlist)
}


remove(index){
  console.log("REMOVE INDEX"+index)
  this.memberlist.splice(index, 1);
  console.log("REMOVE LENGTH"+this.memberlist.length)
}

}
