import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
role: String;
user: any;
navdisplay: any;
  constructor(
    public authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    if(!this.authService.loggedIn()){

        this.user = JSON.parse(localStorage.getItem("user"));
        console.log(this.user)
        this.role = this.user.role;
        if (this.role == "Administrator"){
          this.navdisplay = "Administrator";
        }
        if (this.role == "Mentor"){
          this.navdisplay = "Mentor";
        }
        if (this.role == "User"){
          this.navdisplay = "User";
        }

      }

  }

onLogoutClick(){
this.authService.logout();
this.flashMessage.show("You are logged out", {cssClass:"alert-success",timeout:3000});
this.router.navigate(['/login']);
return false
};

}
