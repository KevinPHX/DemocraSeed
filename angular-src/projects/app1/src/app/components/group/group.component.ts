import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse} from "@angular/common/http";
import { DataService} from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  user: any
  groupname: String;
  advisorfirstname: String;
  advisorlastname: String;
  advisoremail: String;
  href: String;
  id: String;
  content: String;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  permission1: any;
  permission2: any;
  permission3: any;
  permission4: any;
  permission5: any;
  progress: String;
  tasks: any;
  cityname: String;
  memberlist: any;
  mentors:any;
  mentor: any;
  constructor(
    private authService:AuthService,
    private router:Router,
    private http:HttpClient,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href)
    this.id = this.href.substring(12);
    this.authService.findMentors().subscribe((data: any) => {
      console.log(data)
      this.mentors = data
    })

    this.authService.findUser(this.id).subscribe((data: any) => {
      this.user = data[0]
      this.groupname = this.user.groupname
      this.advisorfirstname = this.user.advisorfirstname
      this.advisorlastname = this.user.advisorlastname
      this.advisoremail = this.user.advisoremail
      this.cityname = this.user.cityname
      this.memberlist = this.user.memberlist
      this.permission1 = this.user.permission1
      this.permission2 = this.user.permission2
      this.permission3 = this.user.permission3
      this.permission4 = this.user.permission4
      this.permission5 = this.user.permission5
      this.mentor = this.user.mentorid
      this.dataService.getTasks(this.id).subscribe((data:any) => {
        this.tasks = data
        console.log(this.tasks)
      })
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
    })
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

  saveMentor(){

    this.dataService.matchMentor(this.id, this.mentor).subscribe((data:any) => {
      if (data.success) {
        console.log("success")
      } else {
        console.log("Something went wrong");

      }
    })
  }

}
