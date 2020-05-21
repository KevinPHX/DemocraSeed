import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  username:String;
  _id:String;
  id: String;
  mentor: any;
  permission1: any;
  permission2: any;
  permission3: any;
  permission4: any;
  permission5: any;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  memberlist:any;
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getStep1().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step1 = data[0].title
        console.log(this.step1)
      }
    })
    this.dataService.getStep2().subscribe((data: any) => {
      this.step2 = data[0].title
      console.log(this.step2)

    })
    console.log(this.step2)

    this.dataService.getStep3().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step3 = data[0].title
      }
    })
    this.dataService.getStep4().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step4 = data[0].title
      }
    })
    this.dataService.getStep5().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step5 = data[0].title
      }
    })
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
      this.username = profile.user.username;
      this.id = profile.user._id;
      console.log(this.id);
      this.memberlist = this.user.memberlist
      this.permission1 = this.user.permission1
      this.permission2 = this.user.permission2
      this.permission3 = this.user.permission3
      this.permission4 = this.user.permission4
      this.permission5 = this.user.permission5
      this.dataService.getMentorById(this.user.mentorid).subscribe((data:any) => {
        this.mentor = data
      })
    },
    err => {
      console.log(err);
      return false;
    });
  }

  findProgress(): String {
    var progress = ""
    if (this.permission1 == false){
      progress = "None"
    }
    if (this.permission1 == true && this.permission2 == false){
      progress = this.step1
    }
    if (this.permission2 == true && this.permission3 == false){
      progress = this.step2
    }
    if (this.permission3 == true && this.permission4 == false){
      progress = this.step3
    }
    if (this.permission4 == true && this.permission5 == false){
      progress = this.step4
    }
    if (this.permission5 == true){
      progress = this.step5
    }
    return progress
  }

  // updateProfile(id){
  //   this.router.navigate(['/update/'+id])
  // }

}
