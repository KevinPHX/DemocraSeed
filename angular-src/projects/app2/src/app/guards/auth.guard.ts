import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate{
  role: String;
  user: any;
  constructor(private authService:AuthService, private router:Router){

  }
  canActivate(){
    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = this.user.role;
    console.log(this.role)
    if(this.authService.loggedIn() || this.role != "Mentor"){
      this.router.navigate(['/app1/login']);
      return false;
    } else {
      return true;
    }
  }
}
