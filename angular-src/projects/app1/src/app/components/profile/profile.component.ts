import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  username:String;
  _id:String;
  id: String;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
      this.username = profile.user.username;
      this.id = profile.user._id;
      console.log(this.id);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  // updateProfile(id){
  //   this.router.navigate(['/update/'+id])
  // }

}
