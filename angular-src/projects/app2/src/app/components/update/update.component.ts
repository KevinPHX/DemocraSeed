import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
// import { NgFlashMessageService } from "ng-flash-messages"
import { Router } from '@angular/router';
import { HttpClient, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user:Object;
  _id: String;
  firstname: String;
  lastname: String;
  username: String;
  email: String;
  id: String;
  href: String;
  constructor(
    private validateService: ValidateService,
    // private flashMessages:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
      this.firstname = profile.user.administratorfirstname;
      this.lastname = profile.user.administratorlastname;
      this.username = profile.user.username;
      this.email = profile.user.administratoremail;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  onUpdateSubmit(){
    this.href = this.router.url;
    console.log(this.href)
    this.id = this.href.substring(13);
    console.log(this.id);
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      }
      // if(!this.validateService.validateUpdate(user)){
      //   // this.flashMessages.showFlashMessage({messages: ["Please fill in all fields"], dismissible: false, timeout:3000, type:'danger'})
      //   return false;
      // }
      if(!this.validateService.validateEmail(user.email)){
        // this.flashMessages.showFlashMessage({messages: ["Please use a valid email"], dismissible: false, timeout:3000, type:'danger'})
        return false;
      }
      // this.flashMessages.showFlashMessage({messages: ["You are now updated"], dismissible: false, timeout:3000, type:'success'})

      // this.router.navigate(['/profile'])
      // .then(() => {
      //   window.location.reload();
      // });




      //Register New User
      this.authService.updateUser(this.id, user).subscribe((data: any) => {
        console.log(data)
        if(data.success){
          // this.flashMessages.showFlashMessage({messages: ["You are now updated"], dismissible: false, timeout:3000, type:'success'})
          this.router.navigate(['/app1/profile'])
        } else {
          // this.flashMessages.showFlashMessage({messages: ["Something went wrong"], dismissible: false, timeout:3000, type:'danger'})
          this.router.navigate(['/app1/update'])
        }
      });


    }
}
