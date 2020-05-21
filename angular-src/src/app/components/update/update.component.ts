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
  groupname: String;
  advisorfirstname: String;
  advisorlastname: String;
  username: String;
  advisoremail: String;
  cityname: String;
  memberlist = [{memberfirstname: "", memberlastname: "", memberemail:""}]
  id: String;
  href: String;


  constructor(
    private validateService: ValidateService,
    // private flashMessages:NgFlashMessageService,
    private authService:AuthService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
      this.groupname = profile.user.groupname;
      this.advisorfirstname = profile.user.advisorfirstname;
      this.advisorlastname = profile.user.advisorlastname;
      this.username = profile.user.username;
      this.advisoremail = profile.user.advisoremail;
      this.cityname = profile.user.cityname;
      this.memberlist = profile.user.memberlist
    },
    err => {
      console.log(err);
      return false;
    });
  }
  refresh(): void {
    window.location.reload();
  }
  // deleteUser(id){
  //   var user = this.user;
  //   this.authService.deleteUser(id).subscribe(data => {
  //   if(data.n == 1){
  //       for(var i = 0;i < user.length;i++){
  //           if(user[i].id == id){
  //               user.splice(i, 1);
  //           }
  //       }
  //   }
  // })
  // }

  onUpdateSubmit(){
    this.href = this.router.url;
    console.log(this.href)
    this.id = this.href.substring(8);
    console.log(this.id);
    const user = {
      advisorfirstname: this.advisorfirstname,
      advisorlastname: this.advisorlastname,
      advisoremail: this.advisoremail,
      username: this.username,
      cityname: this.cityname,
      memberlist: this.memberlist,
      groupname: this.groupname,
      }
      // if(!this.validateService.validateUpdate(user)){
      //   // this.flashMessages.showFlashMessage({messages: ["Please fill in all fields"], dismissible: false, timeout:3000, type:'danger'})
      //   return false;
      // }
      // if(!this.validateService.validateEmail(user.email)){
      //   // this.flashMessages.showFlashMessage({messages: ["Please use a valid email"], dismissible: false, timeout:3000, type:'danger'})
      //   return false;
      // }
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
          this.router.navigate(['/profile'])
          .then(() => {
            window.location.reload();
          });
        } else {
          // this.flashMessages.showFlashMessage({messages: ["Something went wrong"], dismissible: false, timeout:3000, type:'danger'})
          this.router.navigate(['/update'])
        }
      });





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
