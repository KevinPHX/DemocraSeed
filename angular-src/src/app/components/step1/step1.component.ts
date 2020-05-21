import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{DataService} from "../../data.service";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  user: Object;
  username: String;
  id: String;
  pagetitle: any;
  pagedescription: any;
  videos:any;
  title: any;
  tasks: any;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  constructor(
    private dataService: DataService,
    private authService:AuthService,
    private http: HttpClient,
    private router:Router,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    console.log(this.authService.loggedIn())
    this.dataService.getStep2().subscribe((data: any) => {
      console.log(data[0])
      this.step2 = data[0].title
    })
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
    },
    err => {
      console.log(err);
      return false;
    });
    this.dataService.getStep1Videos().subscribe((data: any) => {
      this.videos = data
      console.log(data)
    })
    this.dataService.getStep1().subscribe((data: any) => {
      this.step1 = data
      this.pagetitle = this.step1[0].title
      this.pagedescription = this.step1[0].description
      console.log(data)
    })

    this.dataService.getTasks().subscribe((tasks: any) => {
      this.tasks = tasks
    })
  }
  embedLink(link): String {
    if (link.includes("youtube.com/watch")){
      var index = link.indexOf("=")
      var substring = link.substring(index+1)
      link = "https://youtube.com/embed/" + substring
    }
    if (link.includes("youtu.be")){
      var substring = link.substring(17)
      link = "https://youtube.com/embed/" + substring
    }
    if (link.includes("vimeo.com")){
      var substring = link.substring(18)
      link = "https://player.vimeo.com/video/" + substring
    }
    return link;
  }
  removeTask(taskid){
    this.dataService.removeTask(taskid).subscribe((data:any) => {
      if (data.success){
        console.log("success")
      } else {
        console.log("Something went wrong")
      }
    })
  }
}
